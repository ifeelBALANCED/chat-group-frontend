import { useUnit } from 'effector-react';
import { $chatGroups } from '@/entities/chat-groups';
import { useNavigate } from 'react-router-dom';
import { $activeChatGroup, newActiveGroupSet } from '@/entities/chat-group';
import classNames from 'classnames';
import { useCallback } from 'react';

export const ChatGroupsList = () =>
{
  const navigate = useNavigate();
  const [activeChatGroupId, setNewActive, chatGroups] = useUnit([
    $activeChatGroup,
    newActiveGroupSet,
    $chatGroups
  ]);

  const handleChatGroupClick = useCallback((uuid: string) =>
  {
    setNewActive(uuid);
    navigate(`/chat-groups/${uuid}`);
  }, [activeChatGroupId]);

  return (
    <div className='p-3 space-y-2'>
      {chatGroups.map((chatGroup) =>
      {
        const isActive = activeChatGroupId === chatGroup.uuid;

        return (
          <button
            key={chatGroup.uuid}
            onClick={() => handleChatGroupClick(chatGroup.uuid)}
            className={classNames('w-full p-3 rounded-lg transition-colors group relative flex flex-col gap-1', {
              'bg-gray-50': isActive,
              'hover:bg-gray-50': !isActive
            })}
          >
            <div className='flex items-center justify-between'>
              <span className='font-medium text-gray-900 text-sm truncate pr-4'>
                {chatGroup.display_name}
              </span>
            </div>
            <div
              className={classNames('absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r transition-opacity', {
                'opacity-100': isActive,
                'opacity-0 group-hover:opacity-100': !isActive
              })}
            />
          </button>
        );
      })}
    </div>
  );
};