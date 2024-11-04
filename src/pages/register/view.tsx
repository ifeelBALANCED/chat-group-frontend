import { Link } from 'react-router-dom';
import { authModel, RegisterForm } from '@/features/auth';

export const RegisterPage = () => (
  <div className='min-h-screen flex items-center justify-center bg-base-200'>
    <div className='border-t-4 border-primary rounded-md border-top card w-full max-w-sm shadow-2xl bg-base-100'>
      <div className='card-body'>
        <h2 className='text-center text-3xl font-bold'>Create Account</h2>
        <RegisterForm />
        <div className='text-center text-sm'>
          <span>Already have an account? </span>
          <Link
            to='/'
            className='text-primary font-semibold hover:underline'
            onClick={() => authModel.registerForm.reset()}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
);