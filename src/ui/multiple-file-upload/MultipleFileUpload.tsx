import { Button } from '@mui/material';
import { ReactElement, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { colorMap } from '../../types/constants'; // Adjust imports as necessary
import PetsFileInput, {
  FileRef,
  PetsFileInputProps,
} from '../pets-file-input/PetsFileInput';
import FileInput from '../uswds/file-input/FileInput';

interface PetsFileInputWrapperProps extends PetsFileInputProps {
  // Include only what's necessary for the wrapper itself
  onSelectFiles: (file: File, index: number) => void;
  onRemoveFiles: (index: number) => void;
  onRemoveInput: (index: number) => void;
  // Add any additional props that regulate the wrapper's behavior but might not be directly passed to PetsFileInput instances
  formControlName: string;
  maxUploaders: number;
  accepts: Array<string>;
}

interface PetsFileInputWrapperProps extends PetsFileInputProps {
  // Include only what's necessary for the wrapper itself
  onSelectFiles: (file: File, index: number) => void;
  onRemoveFiles: (index: number) => void;
  onRemoveInput: (index: number) => void;
  // Add any additional props that regulate the wrapper's behavior but might not be directly passed to PetsFileInput instances
  formControlName: string;
  maxUploaders: number;
  accepts: Array<string>;
  isReadOnly?: boolean;
}

const MultipleFileUpload: React.FC<PetsFileInputWrapperProps> = (props) => {
  // State to track the list of file inputs. Initially, there's one input.
  const [inputs, setInputs] = useState<number[]>([0]);
  const refs = useRef<(FileRef | null)[]>([]);

  const methods = useForm<any>();
  const addInput = () => setInputs((current) => [...current, current.length]);
  const removeInput = (index: number) => {
    setInputs((current) => current.filter((_, i) => i !== index));
    props.onRemoveInput(index);
  };

  const renderInputs = (): ReactElement[] =>
    inputs.map((_, index) => (
      <>
        <FileInput
          id={props.id + index}
          disabled={props.isReadOnly}
          formControlName={props.formControlName + index}
          key={index}
          onRemoveFile={() => {
            props.onRemoveFiles(index);
          }}
          onSelectFile={(file: File) => {
            props.onSelectFiles(file, index);
          }}
          ref={refs.current[index] as any}
          accepts={props.accepts}
          limitSize={props.limitSize}
        />
        {inputs.length < props.maxUploaders && index == inputs.length - 1 && (
          <Button onClick={addInput} disabled={props.isReadOnly}>
            <u style={{ color: colorMap.primaryBlue, fontWeight: 700 }}>
              + Add another upload
            </u>
          </Button>
        )}
        {index !== 0 && index == inputs.length - 1 && (
          <Button
            onClick={() => removeInput(index)}
            disabled={props.isReadOnly}
          >
            <u style={{ color: colorMap.red }}>- Remove</u>
          </Button>
        )}
      </>
    ));

  return (
    <div>
      <FormProvider {...methods}>{renderInputs()}</FormProvider>
    </div>
  );
};

export default MultipleFileUpload;
