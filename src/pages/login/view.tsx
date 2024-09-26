import { A } from '@solidjs/router';

export const LoginPage = () => (
  <div class='min-h-screen flex items-center justify-center bg-base-200'>
    <div class='border-t-4 border-primary rounded-md border-top card w-full max-w-sm shadow-2xl bg-base-100'>
      <div class='card-body'>
        <h2 class='text-center text-3xl font-bold'>Login</h2>

        <form class='flex flex-col gap-y-1'>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              class='input input-bordered w-full'
            />
          </div>

          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              class='input input-bordered w-full'
            />
          </div>

          <div class='form-control mt-4'>
            <button type='submit' class='btn btn-primary w-full'>
              Login
            </button>
          </div>
        </form>

        <div class='text-center text-sm'>
          <span>Don't have an account? </span>
          <A href='/register' class='text-primary font-semibold hover:underline'>
            Sign up
          </A>
        </div>
      </div>
    </div>
  </div>
);