// eslint-disable-next-line import/named
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CSSProperties,
  forwardRef,
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

export type FileUploadType = {
  name: string;
  size: string;
  lastSavedTime: string;
  filePath: string; // Folder Name + File Name, will be used to download the file
};

interface PetsFileInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  accepts: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations?: any;
  formControlName: string;
  width?: string;
  limitSize: number; // Unit: MB
  icon?: IconDefinition;
  style?: CSSProperties | undefined;
  label?: string;
  hideLabel?: boolean;
  isUploading?: boolean;
  uploaded?: boolean;
  disabled?: boolean;
  onSelectFile?: (file: File) => void;
  errorFontSize?: string;
  onRemoveFile?: () => void;
  showDivider?: boolean;
  onViewFile?: (fileUrl: string, fileName: string) => void;
}

export interface FileRef {
  reset: () => void;
}

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const FileInput = forwardRef((props: PetsFileInputProps, ref: any) => {
  const [insideError, setInsideError] = useState<string | undefined>();

  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    reset,
    getValues,
  } = useFormContext();
  const hasError = !!errors[props.formControlName] || insideError; // check if there is an error for this control
  const fileInput = useRef<HTMLInputElement>(null);
  const invisibleInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setValue(props.formControlName, undefined);
      reset();
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInput.current && !getValues(props.formControlName)) {
      fileInput.current.click();
    }
  };

  const onChangeFile = (e: any) => {
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
    if (files && files.length > 0) {
      const file = files[0];
      if (props.accepts.some((acc) => file.name.endsWith(acc))) {
        const reader = new FileReader();
        reader.onload = () => {
          // Size error
          const uploadedFileSize = (file.size / 1024 / 1024).toFixed(2);
          if (parseFloat(uploadedFileSize) > props.limitSize) {
            setInsideError(
              `File size should be less than ${props.limitSize}MB`,
            );
            if (invisibleInput.current) {
              invisibleInput.current.value = '';
              setValue(props.formControlName, undefined);
              trigger(props.formControlName);
            }
            return;
          }
          // File Select Success!
          setInsideError(undefined);
          if (props.onSelectFile) {
            props.onSelectFile(file);
          }
          if (invisibleInput.current) {
            invisibleInput.current.value = file.name;
            setValue(props.formControlName, {
              name: file.name,
              size: file.size.toString(),
              lastSavedTime: '',
            });
            trigger(props.formControlName);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // Expecting items of accepts: .pdf, .ppt...
        const formattedExt = props.accepts.map((ac) =>
          ac.split('.')[1].toUpperCase(),
        );
        setInsideError(`Error with file: not a ${formattedExt.join(' or ')}`);
        setValue(props.formControlName, undefined);
      }
    }
  };

  const removeFile = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null,
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (invisibleInput.current) {
      invisibleInput.current.value = '';
      setValue(props.formControlName, undefined);
      trigger(props.formControlName);
    }

    if (fileInput.current) {
      fileInput.current.value = '';
    }
    if (props.onRemoveFile) {
      props.onRemoveFile();
    }
  };

  // Drag over event handler
  const handleDragEnter = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Drop event handler
  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFileSelect(files);
  };

  // Drag leave event handler
  const handleDragExit = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onViewFile = () => {
    const fileInfo = getValues(props.formControlName);
    if (fileInfo) {
      getFileURL({ filePath: fileInfo.filePath }).then((resp) => {
        if (props.onViewFile) props.onViewFile(resp, fileInfo.name);
      });
    }
  };

  const renderContent = () => {
    if (insideError) {
      return (
        <div className={classes['inside-error-container']}>
          <FontAwesomeIcon fontSize={20} icon={faInfoCircle} />
          <div className={classes['attached-file-info']}>
            <span className={classes['error-info']}>{insideError}</span>
            <div className={classes['action-container']}>
              <a onClick={onChangeFile}>
                <strong>Change file</strong>
              </a>
            </div>
          </div>
        </div>
      );
    }
    if (getValues(props.formControlName) && !props.isUploading) {
      return (
        <div className={classes['attached-file-container']}>
          <FontAwesomeIcon fontSize={20} icon={faClipboardCheck} />
          <div className={classes['attached-file-info']}>
            <span className="file-name">
              {getValues(props.formControlName) && (
                <a
                  style={{
                    cursor: 'pointer',
                    pointerEvents: 'all',
                    fontSize: 15,
                  }}
                  onClick={() => onViewFile()}
                >
                  <strong>{getValues(props.formControlName).name}</strong>
                </a>
              )}
            </span>
            {getValues(props.formControlName) && (
              <span className="file-uploaded-time">
                {`Uploaded: ${convertToLocalTimezone(
                  getValues(props.formControlName).lastSavedTime,
                )}`}
              </span>
            )}
            <span className="file-size">
              Size:{' '}
              {getValues(props.formControlName) &&
                formatFileSize(getValues(props.formControlName).size)}
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
    } else {
      if (props.isUploading) {
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
      }
      return (
        <span>
          <FontAwesomeIcon fontSize={20} icon={faCirclePlus} />
          Drag file or&nbsp;<a>choose from folder</a>
        </span>
      );
    }
  };

  return (
    <div
      className={`${classes['form-control']} ${
        hasError ? classes['has-error'] : ''
      }`}
      style={{ width: props.width, ...props.style }}
    >
      {!props.hideLabel && (
        <div className={classes['label-container']}>
          <label className="usa-label" htmlFor={props.id}>
            {props.label}{' '}
          </label>{' '}
          {(props.validations?.required || props.required) && (
            <span className={classes.required}>*</span>
          )}
        </div>
      )}
      {!insideError && errors[props.formControlName] && (
        <>
          <FormFieldError
            message={errors[props.formControlName]?.message as string}
            style={{
              fontSize: '1rem',
              width: 'max-content',
              marginBottom: '0.5rem',
              maxWidth: '32rem',
            }}
          />
          {props.showDivider && <div className={classes.divider}></div>}
        </>
      )}
      {insideError && (
        <>
          <FormFieldError
            message="The file is not an accepted format or the file size exceeds the maximum. Check your file and try again."
            style={{
              fontSize: props.errorFontSize ? props.errorFontSize : '1rem',
              width: 'max-content',
              marginBottom: '0.5rem',
              maxWidth: '32rem',
            }}
          />
          {props.showDivider && <div className={classes.divider}></div>}
        </>
      )}
      <Controller
        name={props.formControlName}
        control={control}
        defaultValue={''}
        rules={{ ...props.validations }}
        render={({ field }) => (
          <>
            <input
              {...field}
              id={props.id}
              type="text"
              ref={invisibleInput}
              className={classes['invisible-input']}
              name={props.formControlName}
            />
          </>
        )}
      />
      <div className={classes['input-container']}>
        <input
          type="file"
          ref={fileInput}
          className={`${classes['original-file-input-button']} usa-file-input`}
          disabled={props.disabled || props.isUploading}
          name={props.formControlName}
          accept={props.accepts.join(', ')}
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        <button
          onDrop={handleDrop}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragExit}
          className={`${classes['custom-input-btn']} ${
            !!getValues(props.formControlName)
              ? classes['custom-input-btn-selected']
              : ''
          } ${hasError || insideError ? classes['has-error'] : ''}`}
          onClick={onHandleClick}
        >
          {renderContent()}
        </button>
      </div>
    </div>
  );
});

export default FileInput;
