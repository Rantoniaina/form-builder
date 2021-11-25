import { ChangeEvent } from 'react';
import KeyValue from '../../models/KeyValue';

interface SelectProps {
  error?: boolean;
  errorMessage?: string;
  selected: string | number | undefined;
  options: KeyValue[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

const Select = ({
  error,
  errorMessage,
  selected,
  options,
  onChange,
  label,
}: SelectProps) => (
  <>
    <select
      class={`rounded p-2 ${error ? 'border-red-500 border-2 mb-0' : 'mb-4'}`}
      onChange={onChange}
    >
      {label && (
        <option
          selected={selected === undefined}
          value={undefined}
        >{`-- Select ${label} --`}</option>
      )}
      {options.map((option: KeyValue, index: number) => (
        <option
          key={index}
          selected={option.key === selected}
          value={option.key ?? index}
        >
          {option.value}
        </option>
      ))}
    </select>
    {error && errorMessage && errorMessage.length > 0 && (
      <span class="text-xs text-red-500 mb-4">{errorMessage}</span>
    )}
  </>
);

export default Select;
