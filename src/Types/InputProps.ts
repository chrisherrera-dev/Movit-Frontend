import type { ElementType, InputHTMLAttributes } from 'react';

export interface InputProps{
  type?: string;
  placeholder?: string;
  icon?: ElementType;
  iconPassword?: ElementType;
  optional?: boolean
  marginb?: number
  width?: string,
  togglePassword?: () => void
}
