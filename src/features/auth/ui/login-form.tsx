import { loginForm } from '../model';
import { BaseFieldConfig } from '@/shared/types';
import { FormField } from '@/shared/ui/form-field';
import { useForm } from 'effector-forms';
import { FormEventHandler, useState } from 'react';
import { useUnit } from 'effector-react';
import { authModel } from '@/features/auth';

const emailConfig: BaseFieldConfig = {
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email'
};

const passwordConfig: BaseFieldConfig = {
  type: 'password',
  label: 'Password',
  placeholder: 'Enter your password'
};

export const LoginForm = () =>
{
  const authPending = useUnit(authModel.$authProcessing);
  const {
    fields, eachValid, submit, isValid
  } = useForm(loginForm);
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
    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit} aria-busy={disabled} noValidate>
      <FormField {...emailConfig} field={fields.email} />
      <FormField {...passwordConfig} field={fields.password} />

      <div className='form-control mt-4'>
        <button
          type='submit'
          disabled={disabled || !eachValid || isButtonDisabled}
          className='btn btn-primary w-full'
        >
          {isButtonDisabled ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
};