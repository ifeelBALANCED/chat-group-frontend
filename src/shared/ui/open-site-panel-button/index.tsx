import { CreateNewChatButton } from '@/features/chat-group';
import { Icon } from '@/shared/ui/icon';

interface OpenSidePanelButtonProps {
  onClick: VoidFunction;
}

export const OpenSidePanelButton = ({ onClick }: OpenSidePanelButtonProps) => (
  <div className='flex items-center gap-2'>
    <button
      aria-label='Open Side Panel'
      onClick={onClick}
      className='flex items-center justify-center h-10 w-10 rounded-lg transition duration-200 ease-in-out bg-white text-token-text-secondary hover:bg-token-main-surface-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-token-main focus-visible:ring-opacity-50'
    >
      <Icon name='sprite/panel' fontSize={20} />
    </button>
    <CreateNewChatButton />
  </div>
);