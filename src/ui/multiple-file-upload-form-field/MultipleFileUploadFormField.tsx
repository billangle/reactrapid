import { Button } from '@mui/material';
import { ReactElement, useEffect, useRef } from 'react';
import classes from './file-input/FileInput.module.scss';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { colorMap } from '../../types/constants'; // Adjust imports as necessary
import FileInput, { FileRef, initialValue } from './file-input/FileInput';

interface MultipleFileUploadFormFieldProps {
  // Include only what's necessary for the wrapper itself
  onSelectFiles?: (file: File, index: number) => void;
  onRemoveFiles?: (index: number) => void;
  onViewFile?: (fileUrl: string, fileName: string, index: number) => void;
  // Add any additional props that regulate the wrapper's behavior but might not be directly passed to FileInputProps instances
  maxUploaders: number;
  accepts: Array<string>;
  isReadOnly?: boolean;
  formControlName: string;
  limitSize: number; // Unit: MB
  id: string;
  // Mostly `${payload.solicitation}/${payload.proposalId}`,
  // If we get a requirement to upload another path, put different one
  bucketKey: string;
  // If this is new form, needs to add form name here
  // types.ts/DOCUMENT_UPLOAD_FORM_TYPES
  // Actual file path on S3 should be `bucketKey + formName + fileName`
  // Note: If the form is Mod General details, this would be (real formName + 'General') to prevent duplicated name with real form's
  formName: string;
  hideLabel?: boolean;
  isRequired?: boolean;
  label: React.ReactNode;
  isSingleUploading?: boolean;
}

/**
 * Note: it doesn't support automatic validating, should validate manually.
 * @param props
 * @returns
 */
const MultipleFileUploadFormField: React.FC<
  MultipleFileUploadFormFieldProps
> = (props) => {
  const refs = useRef<(FileRef | null)[]>([]);
  const methods = useFormContext<any>();
  const {
    fields: uploadingFields,
    append: fieldAppend,
    remove: fieldRemove,
  } = useFieldArray({
    control: methods.control,
    name: props.formControlName,
  });
  useEffect(() => {
    if (
      !methods.getValues(props.formControlName) ||
      methods.getValues(props.formControlName).length === 0
    ) {
      addField();
    }
  }, []);
  const addField = () => {
    fieldAppend(initialValue);
  };
  const removeField = (idx: number) => {
    fieldRemove(idx);
  };

  const renderInputs = (): ReactElement[] =>
    uploadingFields.map((field, index) => (
      <>
        <FileInput
          key={index}
          id={props.id + index}
          isReadOnly={!!props.isReadOnly}
          formControlName={`${props.formControlName}`}
          index={index}
          onRemoveFile={() => {
            if (props.onRemoveFiles) {
              props.onRemoveFiles(index);
            }
          }}
          onSelectFile={(file: File) => {
            if (props.onSelectFiles) {
              props.onSelectFiles(file, index);
            }
          }}
          onViewFile={(fileUrl: string, fileName: string, idx: number) => {
            if (props.onViewFile) {
              props.onViewFile(fileUrl, fileName, idx);
            }
          }}
          ref={refs.current[index] as any}
          accepts={props.accepts}
          limitSize={props.limitSize}
          bucketKey={props.bucketKey}
          formName={props.formName}
          isRequired={props.isRequired}
        />
        {!props.isSingleUploading && (
          <>
            {uploadingFields.length < props.maxUploaders &&
              index == uploadingFields.length - 1 &&
              !props.isReadOnly && (
                <Button onClick={addField} disabled={props.isReadOnly}>
                  <u style={{ color: colorMap.primaryBlue, fontWeight: 700 }}>
                    + Add another file
                  </u>
                </Button>
              )}
            {index !== 0 &&
              index == uploadingFields.length - 1 &&
              !props.isReadOnly && (
                <Button
                  onClick={() => removeField(index)}
                  disabled={props.isReadOnly}
                >
                  <u style={{ color: colorMap.red }}>- Remove File</u>
                </Button>
              )}
          </>
        )}
      </>
    ));

  return (
    <div>
      {!props.hideLabel && props.label && (
        <div className={classes['label-container']}>
          <label className="usa-label" htmlFor={props.id}>
            {props.label}{' '}
          </label>{' '}
        </div>
      )}
      {renderInputs()}
    </div>
  );
};

export default MultipleFileUploadFormField;
