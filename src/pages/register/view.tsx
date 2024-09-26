import { A } from '@solidjs/router';

export const RegisterPage = () => (
  <div class='min-h-screen flex items-center justify-center bg-base-200'>
    <div class='border-t-4 border-primary rounded-md border-top card w-full max-w-sm shadow-2xl bg-base-100'>
      <div class='card-body'>
        <h2 class='text-center text-3xl font-bold'>Create Account</h2>

        <form class='flex flex-col gap-y-1'>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Enter your full name'
              class='input input-bordered w-full'
            />
          </div>

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
              placeholder='Create a password'
              class='input input-bordered w-full'
            />
          </div>

          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm your password'
              class='input input-bordered w-full'
            />
          </div>

          <div class='form-control mt-4'>
            <button type='submit' class='btn btn-primary w-full'>
              Sign Up
            </button>
          </div>
        </form>

        <div class='text-center text-sm'>
          <span>Already have an account? </span>
          <A href='/' class='text-primary font-semibold hover:underline'>
            Login
          </A>
        </div>
      </div>
    </div>
  </div>
);