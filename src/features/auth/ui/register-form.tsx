import { FormEventHandler, useState } from 'react';
import { useForm } from 'effector-forms';
import { registerForm } from '@/features/auth/model';
import { FormField } from '@/shared/ui/form-field';
import { useUnit } from 'effector-react/effector-react.umd';
import { authModel } from '@/features/auth';

export const RegisterForm = () =>
{
  const authPending = useUnit(authModel.$authProcessing);
  const {
    fields, submit, eachValid, isValid
  } = useForm(registerForm);
  const disabled = authPending || !isValid;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
  {
    e.preventDefault();

    setIsButtonDisabled(true);

    submit();

    setTimeout(() =>
    {
      setIsButtonDisabled(false);
    }, 3000);
  };

  return (
    <form className='flex flex-col gap-y-1' onSubmit={handleSubmit}>
      <FormField
        field={fields.email}
        type='email'
        label='Email'
        placeholder='Enter your email'
        errorMessages={{
          required: 'Email is required',
          'min-length-1': 'Email is too short',
          'max-length-70': 'Email is too long',
          email: 'Please enter a valid email address'
        }}
      />
      <FormField
        field={fields.nickname}
        type='text'
        label='Nickname'
        placeholder='Enter your nickname'
        errorMessages={{
          required: 'Nickname is required',
          'min-length-1': 'Nickname is too short',
          'max-length-20': 'Nickname is too long'
        }}
      />
      <FormField
        field={fields.password}
        type='password'
        label='Password'
        placeholder='Enter your password'
        errorMessages={{
          required: 'Password is required',
          'min-length-8': 'Password must be at least 8 characters',
          'max-length-128': 'Password cannot exceed 128 characters'
        }}
      />

      <div className='form-control mt-4'>
        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={!eachValid || disabled || isButtonDisabled}
        >
          {isButtonDisabled ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>
  );
};