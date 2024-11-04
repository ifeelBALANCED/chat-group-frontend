import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className='min-h-screen flex items-center justify-center bg-base-200'>
    <div className='text-center'>
      <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
      <p className='text-2xl mb-4'>Oops! Page not found.</p>
      <p className='mb-8'>The page you're looking for doesn't exist or has been moved.</p>

      <Link to='/' className='btn btn-primary'>
        Go Back Home
      </Link>
    </div>
  </div>
);