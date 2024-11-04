import { Link } from 'react-router-dom';
import { authModel, LoginForm } from '@/features/auth';

export const LoginPage = () => (
  <div className='min-h-screen flex items-center justify-center bg-base-200'>
    <div className='border-t-4 border-primary rounded-md border-top card w-full max-w-sm shadow-2xl bg-base-100'>
      <div className='card-body'>
        <h2 className='text-center text-3xl font-bold'>Login</h2>
        <LoginForm />
        <div className='text-center text-sm'>
          <span>Don't have an account? </span>
          <Link
            to='/register'
            className='text-primary font-semibold hover:underline'
            onClick={() => authModel.loginForm.reset()}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  </div>
);