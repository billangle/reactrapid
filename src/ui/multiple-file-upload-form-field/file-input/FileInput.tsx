// eslint-disable-next-line import/named
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  faCirclePlus,
  faClipboardCheck,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import FormFieldError from '../../form-field-error/FormFieldError';
import classes from './FileInput.module.scss';
import { convertToLocalTimezone } from '../../../utils/dateTimeUtil';
import { Button } from '@trussworks/react-uswds';
import { getFileURL } from '../../../_store/api/commonApi';
import { useAppDispatch } from '../../../_store/hooks';
import { uploadContractFileByBucketKey } from '../../../_store/features/app/appActions';
import { showBanner } from '../../PetsToast';

export type FileUploadType = {
  name: string;
  size: string;
  lastSavedTime: string;
  filePath: string; // Folder Name + File Name, will be used to download the file
};

export interface FileInputProps {
  id: string;
  accepts: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  width?: string;
  limitSize: number; // Unit: MB
  style?: CSSProperties | undefined;
  label?: string;
  disabled?: boolean;
  onSelectFile?: (file: File) => void;
  errorFontSize?: string;
  onRemoveFile?: () => void;
  showDivider?: boolean;
  onViewFile?: (fileUrl: string, fileName: string, index: number) => void;
  formControlName: string;
  index: number;
  isReadOnly: boolean;
  bucketKey: string;
  formName: string;
  isRequired?: boolean;
}

export const initialValue: FileUploadType = {
  name: '',
  size: '',
  lastSavedTime: '',
  filePath: '',
};

export interface FileRef {
  reset: () => void;
}

const insideErrorMessage =
  'The file is not an accepted format or the file size exceeds the maximum. Check your file and try again.';
const duplicatedErrorMessage = 'File name is duplicated.';

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const FileInput = forwardRef((props: FileInputProps, ref: any) => {
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    setError,
    clearErrors,
    watch,
  } = useFormContext();
  const fileInput = useRef<any>(null);
  const currentError = errors[`${props.formControlName}`]
    ? (errors[`${props.formControlName}`] as any)[`${props.index}`]
    : null; // check if there is an error for this control
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = (file: File) => {
    if (file) {
      setIsUploading(true);
      dispatch(
        uploadContractFileByBucketKey({
          bucketKey: `${props.bucketKey}/${props.formName}`,
          file,
        }),
      )
        .then((response) => {
          setValue(
            `${props.formControlName}.${props.index}`,
            {
              name: file.name,
              lastSavedTime: (response.payload as any).uploadedDate,
              size: file.size.toString(),
              filePath: (response.payload as any).filePath,
            },
            {
              shouldValidate: false,
              shouldDirty: false,
            },
          );
        })
        .catch(() => {
          setValue(`${props.formControlName}.${props.index}`, initialValue, {
            shouldValidate: false,
            shouldDirty: false,
          });
          if (fileInput.current) {
            fileInput.current.value = '';
          }
          showBanner('Failed to upload file.', 'error');
        })
        .finally(() => {
          setIsUploading(false);
          trigger(`${props.formControlName}.${props.index}`);
        });
      return;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleClick = (e: any) => {
    if (props.isReadOnly) return;
    e.preventDefault();
    e.stopPropagation();
    if (
      fileInput.current &&
      !getValues(`${props.formControlName}.${props.index}`).name
    ) {
      fileInput.current.click();
    }
  };

  const onChangeFile = (e: any) => {
    if (props.isReadOnly) return;
    e.preventDefault();
    e.stopPropagation();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const formatFileSize = (size: number | string) => {
    let convertedSize = size;
    if (typeof size === 'string') {
      convertedSize = Number(size);
    }
    const mbSize = (convertedSize as number) / 1024 / 1024;
    return `${mbSize?.toFixed(2)} MB`;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (props.isReadOnly) return;
    if (files && files.length > 0) {
      const file = files[0];
      const names: string[] = getValues(props.formControlName).map(
        (f: FileUploadType) => f.name,
      );
      if (names.find((n) => n === file.name)) {
        // Name error
        setError(`${props.formControlName}.${props.index}`, {
          type: 'nameError',
          message: `${file.name} is already existed.`,
        });
        setValue(`${props.formControlName}.${props.index}`, initialValue);
      } else {
        if (
          props.accepts.some((acc) =>
            file.name.toLowerCase().endsWith(acc.toLowerCase()),
          )
        ) {
          const reader = new FileReader();
          reader.onload = () => {
            // Size error
            const uploadedFileSize = (file.size / 1024 / 1024).toFixed(2);
            if (parseFloat(uploadedFileSize) > props.limitSize) {
              setError(`${props.formControlName}.${props.index}`, {
                type: 'sizeError',
                message: `File size should be less than ${props.limitSize}MB`,
              });
              setValue(`${props.formControlName}.${props.index}`, initialValue);
              return;
            }
            // File Select Success!
            clearErrors(`${props.formControlName}.${props.index}`);
            if (props.onSelectFile) {
              props.onSelectFile(file);
            }
            setValue(`${props.formControlName}.${props.index}`, {
              name: file.name,
              lastSavedTime: '',
              size: file.size.toString(),
              filePath: '',
            });
            uploadFile(file);
          };
          reader.readAsDataURL(file);
        } else {
          // Expecting items of accepts: .pdf, .ppt...
          const formattedExt = props.accepts.map((ac) =>
            ac.split('.')[1].toUpperCase(),
          );
          setError(`${props.formControlName}.${props.index}`, {
            type: 'typeError',
            message: `Error with file: not a ${formattedExt.join(' or ')}`,
          });
          setValue(`${props.formControlName}.${props.index}`, initialValue);
        }
      }
    }
  };

  const removeFile = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null,
  ) => {
    if (props.isReadOnly) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValue(`${props.formControlName}.${props.index}`, initialValue);
    trigger(`${props.formControlName}.${props.index}`);

    if (fileInput.current) {
      fileInput.current.value = '';
    }
    if (props.onRemoveFile) {
      props.onRemoveFile();
    }
  };

  // Drag over event handler
  const handleDragEnter = (event: React.DragEvent<HTMLButtonElement>) => {
    if (props.isReadOnly) return;
    event.preventDefault();
    event.stopPropagation();
  };

  // Drop event handler
  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    if (props.isReadOnly) return;
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFileSelect(files);
  };

  // Drag leave event handler
  const handleDragExit = (event: React.DragEvent<HTMLButtonElement>) => {
    if (props.isReadOnly) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const onViewFile = (e?: Event) => {
    e?.preventDefault();
    const fileInfo = getValues(`${props.formControlName}.${props.index}`);
    if (fileInfo) {
      getFileURL({ filePath: fileInfo.filePath }).then((resp) => {
        if (props.onViewFile) {
          props.onViewFile(resp, fileInfo.name, props.index);
        }
        // Downloading
        const link = document.createElement('a');
        link.href = resp;
        link.target = '_blank';
        link.setAttribute('download', fileInfo.name);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  };

  const renderReadOnlyVersion = () => {
    if (!getValues(`${props.formControlName}.${props.index}`)?.name) {
      return <></>;
    }
    return (
      <div className={classes['attached-file-container']}>
        <FontAwesomeIcon fontSize={20} icon={faClipboardCheck} />
        <div className={classes['attached-file-info']}>
          <span className="file-name">
            <strong>
              {getValues(`${props.formControlName}.${props.index}`).name}
            </strong>
          </span>
          {getValues(`${props.formControlName}.${props.index}`) && (
            <span className="file-uploaded-time">
              {`Uploaded: ${convertToLocalTimezone(
                getValues(`${props.formControlName}.${props.index}`)
                  .lastSavedTime,
              )}`}
            </span>
          )}
          <span className="file-size">
            Size:{' '}
            {getValues(`${props.formControlName}.${props.index}`) &&
              formatFileSize(
                getValues(`${props.formControlName}.${props.index}`).size,
              )}
          </span>
          <div className={classes['action-container']}>
            <a onClick={() => onViewFile(event)}>
              <strong>View file</strong>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderInsideError = () => {
    return (
      <div className={classes['inside-error-container']}>
        <FontAwesomeIcon fontSize={20} icon={faInfoCircle} />
        <div className={classes['attached-file-info']}>
          <span className={classes['error-info']}>{currentError.message}</span>
          <div className={classes['action-container']}>
            <a onClick={onChangeFile}>
              <strong>Change file</strong>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderUploadedFile = () => {
    return (
      <div className={classes['attached-file-container']}>
        <FontAwesomeIcon fontSize={20} icon={faClipboardCheck} />
        <div className={classes['attached-file-info']}>
          <span className="file-name">
            <a
              style={{
                cursor: 'pointer',
                pointerEvents: 'all',
                fontSize: 15,
              }}
              onClick={() => onViewFile(event)}
            >
              <strong>
                {getValues(`${props.formControlName}.${props.index}`).name}
              </strong>
            </a>
          </span>
          {getValues(`${props.formControlName}.${props.index}`) && (
            <span className="file-uploaded-time">
              {`Uploaded: ${convertToLocalTimezone(
                getValues(`${props.formControlName}.${props.index}`)
                  .lastSavedTime,
              )}`}
            </span>
          )}
          <span className="file-size">
            Size:{' '}
            {getValues(`${props.formControlName}.${props.index}`) &&
              formatFileSize(
                getValues(`${props.formControlName}.${props.index}`).size,
              )}
          </span>
          <div className={classes['action-container']}>
            <a onClick={onChangeFile}>
              <strong>Change file</strong>
            </a>
            <a className={classes['remove-btn']} onClick={removeFile}>
              <strong>Remove file</strong>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderUploading = () => {
    return (
      <>
        <div className={classes['loading-wrapper']}>
          <div className={classes['loading-container']}>
            <div className={classes.loading}></div>
            <div className={classes.label}>Uploading...</div>
          </div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    // Read Only Version
    if (props.isReadOnly) {
      return renderReadOnlyVersion();
    }
    if (isUploading) {
      return renderUploading();
    }
    if (
      currentError &&
      (currentError?.type === 'typeError' ||
        currentError?.type === 'sizeError' ||
        currentError?.type === 'nameError')
    ) {
      return renderInsideError();
    }
    if (
      getValues(`${props.formControlName}.${props.index}`)?.name &&
      !isUploading
    ) {
      return renderUploadedFile();
    }
    return (
      <span>
        <FontAwesomeIcon fontSize={20} icon={faCirclePlus} />
        Drag file or&nbsp;<a>choose from folder</a>
      </span>
    );
  };
  return (
    <div
      className={`${classes['form-control']} ${
        currentError ? classes['has-error'] : ''
      }`}
      style={{ width: props.width, ...props.style }}
    >
      {currentError && (
        <>
          <FormFieldError
            message={
              currentError?.type === 'typeError' ||
              currentError?.type === 'sizeError'
                ? insideErrorMessage
                : currentError?.type === 'nameError'
                ? duplicatedErrorMessage
                : (currentError?.message as string)
            }
            style={{
              fontSize: '1rem',
              width: 'max-content',
              marginBottom: '0.5rem',
              maxWidth: '32rem',
            }}
          />
        </>
      )}
      <div className={classes['input-container']}>
        <input
          type="file"
          ref={fileInput}
          name={`${props.formControlName}.${props.index}`}
          className={`${classes['original-file-input-button']} usa-file-input`}
          disabled={props.disabled || isUploading}
          accept={props.accepts.join(', ')}
          onChange={(e) => {
            handleFileSelect(e.target.files);
          }}
        />
        <button
          onDrop={handleDrop}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragExit}
          className={`${classes['custom-input-btn']} ${
            !!getValues(`${props.formControlName}.${props.index}`)?.name
              ? classes['custom-input-btn-selected']
              : ''
          } ${currentError ? classes['has-error'] : ''}`}
          onClick={onHandleClick}
        >
          {renderContent()}
        </button>
      </div>
      <label
        style={{ marginTop: '10px', color: '#7d7d7d', fontSize: '0.9rem' }}
      >
        <strong>Maximum file size: </strong> {props.limitSize}MB
      </label>
    </div>
  );
});

export default FileInput;
