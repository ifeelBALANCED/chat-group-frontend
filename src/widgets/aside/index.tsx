import { useGate, useList, useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { $chatGroups, ChatGroupsGate, chatGroupsHandler } from '@/entities/chat-groups';
import { chatGroupModel, CreateNewChatButton } from '@/features/chat-group';
import { Loader } from '@/shared/ui/loader';
import classNames from 'classnames';
import { Icon } from '@/shared/ui/icon';
import { SafeView } from '@/shared/ui/safe-view';

export const Aside = () =>
{
  useGate(ChatGroupsGate);

  const [isSidebarOpen, onSidebarChange, isLoading] = useUnit([
    chatGroupModel.sidebarVisibilityApi.$value,
    chatGroupModel.sidebarVisibilityApi.toggle,
    chatGroupsHandler.$loading
  ]);

  const navigate = useNavigate();

  return (
    <aside
      className={classNames('bg-white border-r border-gray-200 flex-shrink-0 overflow-x-hidden transition-all duration-300 ease-in-out', {
        'w-[300px] opacity-100': isSidebarOpen,
        'w-0 opacity-0 max-md:!w-0': !isSidebarOpen
      })}
    >
      <div className='h-full w-[300px] flex flex-col'>
        <nav className='flex h-[60px] items-center justify-between px-3 md:h-[3.5rem]'>
          <button
            aria-label='Close sidebar'
            data-testid='close-sidebar-button'
            className='h-10 rounded-lg px-2'
            onClick={onSidebarChange}
          >
            <Icon name='sprite/panel' fontSize={24} className='icon-xl-heavy max-md:hidden' />
          </button>
          <CreateNewChatButton />
        </nav>

        <div className='flex-1 overflow-y-auto'>
          <SafeView for={isLoading} otherwise={null}>
            <div className='flex justify-center items-center h-32'>
              <Loader />
            </div>
          </SafeView>
          <div className='p-3 space-y-2'>
            {useList($chatGroups, (chatGroup) => (
              <button
                key={chatGroup.uuid}
                onClick={() => navigate(`/chat-groups/${chatGroup.uuid}`)}
                className='w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group relative flex flex-col gap-1'
              >
                <div className='flex items-center justify-between'>
                  <span className='font-medium text-gray-900 text-sm truncate pr-4'>
                    {chatGroup.display_name}
                  </span>
                </div>
                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r opacity-0 group-hover:opacity-100 transition-opacity' />
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};