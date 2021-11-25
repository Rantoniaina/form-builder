import KeyValue from '../../models/KeyValue';

interface CheckboxProps {
  options: KeyValue[];
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Checkbox = ({ options, label, error, errorMessage }: CheckboxProps) => (
  <div class={`flex items-center flex-col ${error ? 'mb-0' : 'mb-4'}`}>
    {label && label.length > 0 && <span class="font-sans">{label}</span>}
    {options.map((option, index) => (
      <div key={index} class="flex items-center">
        <input
          type="checkbox"
          name={`checkbox${index}`}
          id={`checkbox${index}`}
          value={option.key ?? index}
          class="mr-1"
        />
        <label for={`checkbox${index}`}>{option.value}</label>
      </div>
    ))}
    {error && errorMessage && errorMessage.length > 0 && (
      <span class="text-xs text-red-500 mb-4">{errorMessage}</span>
    )}
  </div>
);

export default Checkbox;
