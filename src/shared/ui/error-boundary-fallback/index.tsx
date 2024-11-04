export const ErrorBoundaryFallback = () => (
  <div className='flex min-h-screen flex-col items-center justify-center p-4 text-center'>
    <h1 className='text-2xl font-bold text-red-600'>Oops! Something went wrong</h1>
    <p className='mt-2 text-gray-600'>Please try refreshing the page or navigate back</p>
    <button
      onClick={() => window.location.reload()}
      className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
    >
      Refresh Page
    </button>
  </div>
);