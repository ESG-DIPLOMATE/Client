import React from 'react';
import $ from './Input.module.scss';
import clsx from 'clsx';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export default function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  className,
}: InputProps) {
  return (
    <input
      className={clsx($.input, className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
    />
  );
}
