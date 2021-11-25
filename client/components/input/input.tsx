import { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  classStyle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
}

const Input = ({
  type,
  classStyle,
  onChange,
  label,
  error,
  errorMessage,
  value,
}: InputProps) => (
  <div class={`flex flex-col items-center ${error ? 'mb-0' : 'mb-4'}`}>
    {label && label.length > 0 && <label class="font-sans">{label}</label>}
    <div class="flex flex-col">
      <input type={type} class={classStyle} onChange={onChange} value={value} />
      {error && errorMessage && errorMessage.length > 0 && (
        <span class="text-xs text-red-500 mb-4">{errorMessage}</span>
      )}
    </div>
  </div>
);

export default Input;
