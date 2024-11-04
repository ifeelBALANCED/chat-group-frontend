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

type BaseLayoutProps = {
  children?: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) =>
{
  const [onLogout, isSidebarOpen, onSidebarChange, isModalOpen] = useUnit([
    authModel.logoutClicked,
    chatGroupModel.sidebarVisibilityApi.$value,
    chatGroupModel.sidebarVisibilityApi.toggle,
    newChatModalApi.$modal
  ]);

  return (
    <div className='relative flex h-screen w-full overflow-hidden transition-colors z-0'>
      <SafeView for={isSidebarOpen} otherwise={null}>
        <Aside />
      </SafeView>
      <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
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
                      <div className='shadow-md sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-[3.5rem] font-semibold max-md:hidden'>
                        <SafeView for={!isSidebarOpen} otherwise={null}>
                          <OpenSidePanelButton onClick={onSidebarChange} />
                        </SafeView>
                        <button
                          onClick={onLogout}
                          className='ml-auto rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary'
                        >
                          <Icon name='sprite/logout' fontSize={24} />
                        </button>
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
      </div>
    </div>
  );
};