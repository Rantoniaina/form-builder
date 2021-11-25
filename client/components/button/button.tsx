import { MouseEventHandler } from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  noMargin?: boolean;
}

const Button = ({ type, onClick, label, noMargin }: ButtonProps) => (
  <button
    class={`bg-blue-200 shadow-2xl rounded p-2 ${!noMargin && 'mb-2'}`}
    type={type}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
