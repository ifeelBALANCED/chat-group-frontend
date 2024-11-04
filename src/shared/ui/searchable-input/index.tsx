import {
  ChangeEvent, KeyboardEvent, useEffect, useRef, useState
} from 'react';
import { FieldValue } from '@/shared/ui/form-field';
import { ConnectedField } from 'effector-forms';

export interface Option {
  id: string | number;
  label: string;
  value: string;
}

export interface SearchableSelectProps<T extends FieldValue> {
  options: Option[];
  field: ConnectedField<T>;
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  noOptionsMessage?: string;
  className?: string;
  error?: string;
  required?: boolean;
  name?: string;
}

export const SearchableSelect = <T extends FieldValue>({
  options,
  field,
  placeholder = 'Select an option...',
  isDisabled = false,
  isLoading = false,
  noOptionsMessage = 'No options found',
  className = '',
  error,
  required = false,
  name
}: SearchableSelectProps<T>) =>
{
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === field.value) || null;

  useEffect(() =>
  {
    const handleClickOutside = (event: MouseEvent) =>
    {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
        setIsFocused(false);
        setSearchTerm(selectedOption?.label || '');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption]);

  useEffect(() =>
  {
    setSearchTerm(selectedOption?.label || '');
  }, [field.value, options]);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelect = (option: Option) =>
  {
    field.onChange(option.value as T);
    setSearchTerm(option.label);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
  {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);

    if(newValue === '')
    {
      field.onChange('' as T);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
  {
    switch (e.key)
    {
      case 'Escape':
        setIsOpen(false);
        setSearchTerm(selectedOption?.label || '');
        break;
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        break;
      case 'Enter':
        if(isOpen && filteredOptions.length === 1)
        {
          handleSelect(filteredOptions[0]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`
          relative rounded-lg transition-all duration-200
          ${isFocused ? 'ring-2 ring-primary ring-opacity-50' : ''}
          ${error ? 'ring-2 ring-error' : ''}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={inputRef}
          type='text'
          name={name}
          required={required}
          disabled={isDisabled}
          className={`
            input input-bordered w-full pr-10
            ${error ? 'input-error' : ''}
            ${isDisabled ? 'cursor-not-allowed' : ''}
          `}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() =>
          {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          role='combobox'
          aria-expanded={isOpen}
          aria-autocomplete='list'
          aria-controls='options-list'
        />

        <button
          type='button'
          className={`
            absolute right-1 top-[20%] bottom-0
            btn btn-ghost btn-circle btn-sm
            ${isDisabled ? 'cursor-not-allowed' : ''}
          `}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          disabled={isDisabled}
          aria-label='Toggle options'
        >
          {isLoading ? (
            <div className='loading loading-spinner loading-sm' />
          ) : (
            <svg
              className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          )}
        </button>
      </div>

      {error && <p className='mt-1 text-sm text-error'>{error}</p>}

      {isOpen && !isDisabled && (
        <ul
          id='options-list'
          role='listbox'
          className='
            absolute z-20 w-full mt-1
            max-h-60 overflow-auto rounded-md
            bg-base-100 shadow-lg border border-base-300
          '
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option) => (
            <li
                key={option.id}
                role='option'
                aria-selected={selectedOption?.id === option.id}
                className={`
                px-4 py-2 cursor-pointer
                hover:bg-base-200 transition-colors
                ${selectedOption?.id === option.id ? 'bg-base-200' : ''}
              `}
                onClick={() => handleSelect(option)}
              >
              {option.label}
            </li>
          )) : (
            <li className='px-4 py-2 text-base-content/60'>{noOptionsMessage}</li>
          )}
        </ul>
      )}
    </div>
  );
};