import {
  children, Component, createSignal, JSX, Show
} from 'solid-js';
import { LogoutIcon } from '~/shared/ui/icons';
import { A } from '@solidjs/router';
import { SentRequestButton } from '~/shared/ui/sent-request-button';
import classNames from 'classnames';
import { CloseAsidePanelButton } from '~/shared/ui/close-site-panel-button';
import { OpenSidePanelButton } from '~/shared/ui/open-site-panel-button';

export const BaseLayout: Component<{
  children?: JSX.Element;
}> = (props) =>
{
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);
  const resolved = children(() => props.children);

  return (
    <div class='relative flex h-screen w-full overflow-hidden transition-colors z-0'>
      <div
        class={classNames('flex-shrink-0 overflow-x-hidden shadow-md max-md:!w-0 transition-all duration-300 ease-in-out', {
          'w-[260px] opacity-100': isSidebarOpen(),
          'w-0 opacity-0': !isSidebarOpen()
        })}
      >
        <div class='h-full w-[260px] transition-all duration-300 ease-in-out'>
          <div class='flex h-full min-h-0 flex-col'>
            <div class='relative h-full w-full flex-1 items-start transition-opacity duration-300 ease-in-out'>
              <nav class='flex h-full w-full flex-col px-3 shadow-2xl'>
                <CloseAsidePanelButton onClose={() => setIsSidebarOpen(!isSidebarOpen())} />
                <div class='flex flex-col py-2 empty:hidden dark:border-white/20'>
                  <div class='flex w-full items-center md:hidden'>
                    <div class='max-w-[100%] grow'>
                      <div class='group relative'>
                        <button
                          class='flex w-full max-w-[100%] items-center gap-2 rounded-lg p-2 text-sm hover:bg-token-sidebar-surface-secondary group-ui-open:bg-token-sidebar-surface-secondary'
                          data-testid='accounts-profile-button'
                          type='button'
                        >
                          <div class='flex-shrink-0'>
                            <div class='flex items-center justify-center overflow-hidden rounded-full'>
                              <img
                                src='https://lh3.googleusercontent.com/a/AEdFTp42tPzjEtMwtls5fiySIkhUsXH909RvCww0N72s=s96-c'
                                alt='User'
                                width='32'
                                height='32'
                                class='rounded-sm'
                                referrerPolicy='no-referrer'
                              />
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
        <main class='relative h-full w-full flex-1 overflow-auto transition-width'>
          <div
            role='presentation'
            class='composer-parent flex h-full flex-col focus-visible:outline-0'
          >
            <div class='flex-1 overflow-hidden'>
              <div class='h-full'>
                <div class='relative h-full'>
                  <div class='h-full overflow-y-auto w-full'>
                    <div class='flex flex-col text-sm h-full'>
                      <div class='shadow-md sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-[3.5rem] font-semibold max-md:hidden'>
                        <Show when={!isSidebarOpen()}>
                          <OpenSidePanelButton onClick={() => setIsSidebarOpen(!isSidebarOpen())} />
                        </Show>
                        <A
                          href='/'
                          class='ml-auto rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary'
                        >
                          <LogoutIcon />
                        </A>
                      </div>
                      <div class='flex flex-1'>{resolved()}</div>
                      <div class='relative w-full flex items-center py-2'>
                        <div class='w-full flex flex-col gap-2 p-4 rounded-lg dark:bg-neutral transition-colors'>
                          <div class='flex items-center gap-2'>
                            <div class='flex-grow'>
                              <div class='relative'>
                                <textarea
                                  class='textarea textarea-bordered w-full h-16 resize-none bg-transparent text-base-content dark:text-white placeholder-base-content'
                                  placeholder='Type your message...'
                                />
                              </div>
                            </div>
                            <SentRequestButton />
                          </div>
                        </div>
                      </div>
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