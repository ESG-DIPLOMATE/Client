import React from 'react';
import $ from './Button.module.scss';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'kakao';
export type ButtonSize = 'large' | 'small';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'large',
  disabled = false,
  onClick,
  className,
  type = 'button',
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        $.button,
        $[variant],
        $[size],
        disabled && $.disabled,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <img src={icon} alt="icon" className={$.icon} />
      )}
      {children}
    </button>
  );
}
