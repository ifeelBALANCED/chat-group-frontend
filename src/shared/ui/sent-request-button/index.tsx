import { SentRequestIcon } from '~/shared/ui/icons';

export const SentRequestButton = () => (
  <div class='min-w-8'>
    <button
      aria-label='Надіслати запит'
      data-testid='send-button'
      class='mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary disabled:bg-[#D7D7D7]'
    >
      <SentRequestIcon />
    </button>
  </div>
);