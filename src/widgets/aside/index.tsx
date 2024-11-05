import { useGate, useUnit } from 'effector-react';
import { $chatGroups, ChatGroupsGate, chatGroupsHandler } from '@/entities/chat-groups';
import { chatGroupModel, CreateNewChatButton } from '@/features/chat-group';
import { Loader } from '@/shared/ui/loader';
import classNames from 'classnames';
import { Icon } from '@/shared/ui/icon';
import { SafeView } from '@/shared/ui/safe-view';
import { $activeChatGroup, newActiveGroupSet } from '@/entities/chat-group';
import { useNavigate } from 'react-router-dom';
import { ChatGroupsList } from '@/features/chat-groups';

export const Aside = () =>
{
  useGate(ChatGroupsGate);

  const navigate = useNavigate();
  const [isSidebarOpen, onSidebarChange, isLoading, chatGroups, activeChatGroup, setActiveGroup] = useUnit([
    chatGroupModel.sidebarVisibilityApi.$value,
    chatGroupModel.sidebarVisibilityApi.toggle,
    chatGroupsHandler.$loading,
    $chatGroups,
    $activeChatGroup,
    newActiveGroupSet
  ]);

  const handleHomeReturn = () =>
  {
    setActiveGroup(null);
    navigate('/chat-groups');
  };

  return (
    <aside
      className={classNames('bg-white border-r border-gray-200 flex-shrink-0 overflow-x-hidden transition-all duration-300 ease-in-out', {
        'w-[300px] opacity-100': isSidebarOpen,
        'w-0 opacity-0 max-md:!w-0': !isSidebarOpen
      })}
    >
      <div className='h-full w-[300px] flex flex-col'>
        <nav
          className={classNames('flex h-[60px] justify-between items-center px-3 md:h-[3.5rem]')}
        >
          <button
            aria-label='Close sidebar'
            data-testid='close-sidebar-button'
            className='h-10 rounded-lg px-2'
            onClick={onSidebarChange}
          >
            <Icon name='sprite/panel' fontSize={24} className='icon-xl-heavy max-md:hidden' />
          </button>
          <SafeView for={activeChatGroup} otherwise={null}>
            <div className='flex'>
              <Icon name={'sprite/home'} fontSize={24} onClick={handleHomeReturn} />
            </div>
          </SafeView>
          <CreateNewChatButton />
        </nav>

        <div className='flex-1 overflow-y-auto'>
          <SafeView for={isLoading} otherwise={null}>
            <div className='flex justify-center items-center h-32'>
              <Loader />
            </div>
          </SafeView>
          <SafeView for={!isLoading && chatGroups.length > 0} otherwise={null}>
            <ChatGroupsList />
          </SafeView>
        </div>
      </div>
    </aside>
  );
};