import { useUnit } from 'effector-react';
import { Icon } from '@/shared/ui/icon';
import { newChatModalApi } from '@/entities/chat-group';

export const CreateNewChatButton = () =>
{
  const [openCreateModal] = useUnit([newChatModalApi.modalOpened]);

  const handleCreateNewChat = () =>
  {
    openCreateModal();
  };

  return (
    <div className='relative'>
      <button
        aria-label='Create New Chat'
        data-testid='create-new-chat-button'
        className='flex items-center gap-2 h-10 px-2 rounded-lg transition duration-200 ease-in-out bg-white text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-token-main focus-visible:ring-opacity-50 disabled:text-token-text-quaternary'
        onClick={handleCreateNewChat}
      >
        <Icon name='sprite/new-chat-icon' fontSize={20} />
        <span className='text-sm font-medium'>New Chat</span>
      </button>
    </div>
  );
};