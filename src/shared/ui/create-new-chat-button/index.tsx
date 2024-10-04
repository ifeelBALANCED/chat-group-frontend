import { CreateNewChatIcon } from '../icons/new-chat-icon';

export const CreateNewChatButton = () => (
  <div class='flex'>
    <button
      aria-label='Новий чат'
      data-testid='create-new-chat-button'
      class='h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary'
    >
      <CreateNewChatIcon />
    </button>
  </div>
);