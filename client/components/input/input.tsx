import { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  classStyle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, classStyle, onChange }: InputProps) => (
  <input type={type} class={classStyle} onChange={onChange} />
);

export default Input;
