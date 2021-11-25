import { ChangeEvent } from 'react';
import KeyValue from '../../models/KeyValue';

interface RadioButtonProps {
  error?: boolean;
  errorMessage?: string;
  options: KeyValue[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const RadioButton = ({
  error,
  errorMessage,
  options,
  onChange,
  label,
}: RadioButtonProps) => (
  <div class={`flex items-center flex-col ${error ? 'mb-0' : 'mb-4'}`}>
    {label && label.length > 0 && <span>{label}</span>}
    {options.map((option: KeyValue, index: number) => (
      <div key={index}>
        <input
          type="radio"
          id={`rb${index}`}
          name="rb"
          value={option.key ?? `${index}`}
          onChange={onChange}
        />
        <label for={`rb${index}`}>{option.value}</label>
      </div>
    ))}
    {error && errorMessage && errorMessage.length > 0 && (
      <span class="text-xs text-red-500 mb-4">{errorMessage}</span>
    )}
  </div>
);

export default RadioButton;
