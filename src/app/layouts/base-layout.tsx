import { ReactNode } from 'react';
import { OpenSidePanelButton } from '@/shared/ui/open-site-panel-button';
import { useUnit } from 'effector-react';
import { authModel } from '@/features/auth';
import { chatGroupModel, CreateChatModal } from '@/features/chat-group';
import { Outlet } from 'react-router-dom';
import { Icon } from '@/shared/ui/icon';
import { newChatModalApi } from '@/entities/chat-group';
import { Aside } from '@/widgets/aside';
import { SafeView } from '@/shared/ui/safe-view';
import { sessionModel } from '@/entities/session';
import { motion } from 'framer-motion';

type BaseLayoutProps = {
  children?: ReactNode;
};

const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -300 }
};

const Avatar = () =>
{
  const [onLogout, user] = useUnit([authModel.logoutClicked, sessionModel.$user]);

  return (
    <div className='avatar-container flex items-center gap-2 ml-auto'>
      <div className='avatar online placeholder'>
        <div className='bg-neutral text-neutral-content w-8 h-8 rounded-full'>
          <span>{user?.email?.charAt(0).toUpperCase()}</span>
        </div>
      </div>
      <div className='user-info'>
        <div className='text-xs font-semibold'>{user?.email}</div>
        <div className='text-token-text-secondary text-xs'>Online</div>
      </div>
      <motion.button
        onClick={onLogout}
        className='ml-auto rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary'
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon name='sprite/logout' fontSize={24} />
      </motion.button>
    </div>
  );
};

export const BaseLayout = ({ children }: BaseLayoutProps) =>
{
  const [isSidebarOpen, onSidebarChange, isModalOpen] = useUnit([
    chatGroupModel.sidebarVisibilityApi.$value,
    chatGroupModel.sidebarVisibilityApi.toggle,
    newChatModalApi.$modal
  ]);

  return (
    <div className='relative flex h-screen w-full overflow-hidden transition-colors z-0'>
      <motion.div
        initial='closed'
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className='flex'
      >
        <Aside />
      </motion.div>

      <motion.div
        className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <main className='relative h-full w-full flex-1 overflow-auto transition-width'>
          <div
            role='presentation'
            className='composer-parent flex h-full flex-col focus-visible:outline-0'
          >
            <div className='flex-1 overflow-hidden'>
              <div className='h-full'>
                <div className='relative h-full'>
                  <div className='h-full overflow-y-auto w-full'>
                    <div className='flex flex-col text-sm h-full'>
                      <div className='bg-white shadow-md sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-[3.5rem] font-semibold max-md:hidden'>
                        <SafeView for={!isSidebarOpen} otherwise={null}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSidebarOpen ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <OpenSidePanelButton onClick={onSidebarChange} />
                          </motion.div>
                        </SafeView>

                        <Avatar />
                      </div>
                      <div className='flex flex-1'>{children}</div>
                      <Outlet />
                      <SafeView for={isModalOpen} otherwise={null}>
                        <CreateChatModal />
                      </SafeView>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};