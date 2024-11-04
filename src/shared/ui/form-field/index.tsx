import { JSX } from 'react';
import { ConnectedField } from 'effector-forms';
import { BaseFieldConfig } from '@/shared/types';

export type FieldValue = string | number;
export type ErrorMessages = Record<string, string>;

export interface ErrorMessageProps {
  message: string;
  id: string;
}

export interface FormFieldProps<T extends FieldValue> extends BaseFieldConfig {
  field: ConnectedField<T>;
  disabled?: boolean;
  required?: boolean;
  errorMessages?: ErrorMessages;
}

export const ErrorMessage = ({ message, id }: ErrorMessageProps) => (
  <div className='text-red-500 text-sm mt-1 flex items-center'>
    <svg
      id={id}
      xmlns='http://www.w3.org/2000/svg'
      className='h-4 w-4 mr-1 text-red-500'
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zM9 9V5a1 1 0 1 1 2 0v4a1 1 0 0 1-2 0zm1 4a1 1 0 1 1 0-2h.01a1 1 0 0 1-.01 2z'
        clipRule='evenodd'
      />
    </svg>
    <span role='alert'>{message}</span>
  </div>
);

export const FormField = <T extends FieldValue>({
  field,
  type,
  label,
  placeholder,
  disabled = false,
  required = false,
  errorMessages = {}
}: FormFieldProps<T>): JSX.Element =>
{
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;

  const defaultErrorMessages: ErrorMessages = {
    required: `${label} is required`,
    'min-length-8': `${label} is too short`,
    'max-length-128': `${label} is too long`,
    ...errorMessages
  };

  return (
    <div className='form-control'>
      <label className='label' htmlFor={fieldId}>
        <span className='label-text'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </span>
      </label>
      <input
        type={type}
        value={field.value}
        disabled={disabled}
        onChange={(e) => field.onChange(e.currentTarget.value as T)}
        placeholder={placeholder}
        className={`input w-full ${field.hasError() ? 'border-red-500' : 'input-bordered'}`}
        aria-invalid={field.hasError()}
        aria-describedby={field.hasError() ? `${label}-error` : ''}
      />
      {field.hasError() && (
        <ErrorMessage message={field.errorText(defaultErrorMessages)} id={errorId} />
      )}
    </div>
  );
};