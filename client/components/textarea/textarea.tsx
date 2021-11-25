import { ChangeEvent } from 'react';

interface TextAreaProps {
  classStyle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  rows?: number;
  cols?: number;
  value?: string;
}

const TextArea = ({
  classStyle,
  onChange,
  label,
  error,
  errorMessage,
  rows,
  cols,
  value,
}: TextAreaProps) => (
  <div class={`flex flex-col items-center ${error ? 'mb-0' : 'mb-4'}`}>
    {label && label.length > 0 && <label class="font-sans mb">{label}</label>}
    <div class="flex flex-col">
      <textarea
        class={classStyle}
        onChange={onChange}
        rows={rows || 4}
        cols={cols || 50}
        value={value}
      />
      {error && errorMessage && errorMessage.length > 0 && (
        <span class="text-xs text-red-500 mb-4">{errorMessage}</span>
      )}
    </div>
  </div>
);

export default TextArea;
