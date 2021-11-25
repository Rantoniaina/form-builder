import { MouseEventHandler } from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  noMargin?: boolean;
  disabled?: boolean;
}

const Button = ({ type, onClick, label, noMargin, disabled }: ButtonProps) => (
  <button
    class={`bg-blue-200 shadow-2xl rounded p-2 ${!noMargin && 'mb-2'}`}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
