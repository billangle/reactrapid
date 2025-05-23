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
import FormFieldError from '../form-field-error/FormFieldError';
import classes from './PetsFileInput.module.scss';
import { formatFileSize } from '../../utils/formatFileSize';

export interface PetsFileInputProps extends React.HTMLProps<HTMLInputElement> {
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
  lastSavedDate?: string;
  isUploading?: boolean;
  uploaded?: boolean;
  disabled?: boolean;
  onSelectFile?: (file: File) => void;
  errorFontSize?: string;
  onRemoveFile?: () => void;
  showDivider?: boolean;
  defaultSelected?: {
    fileName: string;
    fileSize: string;
  };
  hideRemoveFile?: boolean;
}

export interface FileRef {
  reset: () => void;
}

/**
 * @deprecated
 * Do not use this, use FileInput
 */
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const PetsFileInput = forwardRef((props: PetsFileInputProps, ref: any) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [insideError, setInsideError] = useState<string | undefined>();
  const [isFileDragging, setIsFileDragging] = useState<boolean>(false);
  const [defaultSelected, setDefaultSelected] = useState<{
    fileName: string;
    fileSize: string;
  }>();

  useEffect(() => {
    if (props.defaultSelected) {
      setDefaultSelected(props.defaultSelected);
      if (invisibleInput.current) {
        invisibleInput.current.value = props.defaultSelected.fileName;
        setValue(props.formControlName, props.defaultSelected.fileName);
        // trigger(props.formControlName);
      }
    }
  }, [props.defaultSelected]);

  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useFormContext();
  const hasError = !!errors[props.formControlName] || insideError; // check if there is an error for this control
  const fileInput = useRef<HTMLInputElement>(null);
  const invisibleInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setSelectedFile(undefined);
      reset();
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDefaultSelected(undefined);
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (props.accepts?.some((acc) => file.name.endsWith(acc))) {
        const reader = new FileReader();
        reader.onload = () => {
          // Size error
          if (file.size / 1024 / 1024 >= props.limitSize) {
            setInsideError(
              `File size should be less than ${props.limitSize}MB`,
            );
            setSelectedFile(undefined);
            if (invisibleInput.current) {
              invisibleInput.current.value = '';
              setValue(props.formControlName, '');
              trigger(props.formControlName);
            }
            return;
          }
          setInsideError(undefined);
          setSelectedFile(file);
          if (props.onSelectFile) {
            props.onSelectFile(file);
          }
          if (invisibleInput.current) {
            invisibleInput.current.value = file.name;
            setValue(props.formControlName, file.name);
            trigger(props.formControlName);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // Expecting items of accepts: .pdf, .ppt...
        const formattedExt = props.accepts?.map((ac) =>
          ac.split('.')[1].toUpperCase(),
        );
        setInsideError(`Error with file: not a ${formattedExt.join(' or ')}`);
        setSelectedFile(undefined);
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
    setSelectedFile(undefined);
    setDefaultSelected(undefined);
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

  const renderContent = () => {
    if (insideError) {
      return (
        <div className={classes['inside-error-container']}>
          <FontAwesomeIcon fontSize={20} icon={faInfoCircle} />
          <div className={classes['attached-file-info']}>
            <span className={classes['error-info']}>{insideError}</span>
            <div className={classes['action-container']}>
              <a onClick={onHandleClick}>
                <strong>Change file</strong>
              </a>
            </div>
          </div>
        </div>
      );
    }
    if ((defaultSelected || selectedFile) && !props.isUploading) {
      return (
        <div className={classes['attached-file-container']}>
          <FontAwesomeIcon fontSize={20} icon={faClipboardCheck} />
          <div className={classes['attached-file-info']}>
            <span className="file-name">
              {(selectedFile && <strong>{selectedFile.name}</strong>) ||
                (defaultSelected && (
                  <strong>{defaultSelected.fileName}</strong>
                ))}
            </span>
            <span className="file-uploaded-time">
              {`Uploaded: ${props.lastSavedDate}`}
            </span>
            <span className="file-size">
              Size: {selectedFile && formatFileSize(selectedFile.size)}
              {!selectedFile &&
                defaultSelected &&
                formatFileSize(parseInt(defaultSelected.fileSize))}
            </span>
            <div className={classes['action-container']}>
              <a onClick={onHandleClick}>
                <strong>Change file</strong>
              </a>
              {!props?.hideRemoveFile && (
                <a className={classes['remove-btn']} onClick={removeFile}>
                  <strong>Remove file</strong>
                </a>
              )}
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
          <label htmlFor={props.id}>{props.label} </label>{' '}
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
          className={classes['original-file-input-button']}
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
            !!(selectedFile || defaultSelected)
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

export default PetsFileInput;
