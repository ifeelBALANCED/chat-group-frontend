import { useGate, useUnit } from 'effector-react';
import { $chatGroups, ChatGroupsGate, chatGroupsHandler } from '@/entities/chat-groups';
import { chatGroupModel, CreateNewChatButton } from '@/features/chat-group';
import { Loader } from '@/shared/ui/loader';
import { Icon } from '@/shared/ui/icon';
import { SafeView } from '@/shared/ui/safe-view';
import { $activeChatGroup, newActiveGroupSet } from '@/entities/chat-group';
import { useNavigate } from 'react-router-dom';
import { ChatGroupsList } from '@/features/chat-groups';
import { motion } from 'framer-motion';

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
    <motion.aside
      className='bg-white border-r border-gray-200 flex-shrink-0 overflow-x-hidden'
      initial={{ opacity: 0, width: 0 }}
      animate={{
        opacity: isSidebarOpen ? 1 : 0,
        width: isSidebarOpen ? '300px' : '0px'
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut'
      }}
    >
      <div className='h-full w-[300px] flex flex-col'>
        <motion.nav
          className='flex h-[60px] justify-between items-center px-3 md:h-[3.5rem]'
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <motion.button
            aria-label='Close sidebar'
            data-testid='close-sidebar-button'
            className='h-10 rounded-lg px-2 transition-transform transform hover:scale-110'
            onClick={onSidebarChange}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon name='sprite/panel' fontSize={24} className='icon-xl-heavy max-md:hidden' />
          </motion.button>

          <SafeView for={activeChatGroup} otherwise={null}>
            <motion.div
              className='flex'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: 0.4
              }}
            >
              <Icon
                name={'sprite/home'}
                fontSize={24}
                onClick={handleHomeReturn}
                className='cursor-pointer hover:text-blue-600 transition-colors'
              />
            </motion.div>
          </SafeView>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <CreateNewChatButton />
          </motion.div>
        </motion.nav>

        <div className='flex-1 overflow-y-auto'>
          <SafeView for={isLoading} otherwise={null}>
            <motion.div
              className='flex justify-center items-center h-32'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut'
              }}
            >
              <Loader />
            </motion.div>
          </SafeView>

          <SafeView for={!isLoading && chatGroups.length > 0} otherwise={null}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <ChatGroupsList />
            </motion.div>
          </SafeView>
        </div>
      </div>
    </motion.aside>
  );
};