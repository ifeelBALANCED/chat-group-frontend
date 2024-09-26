import {
  children, Component, createSignal, JSX, Show
} from 'solid-js';
import classNames from 'classnames';
import { LogoutIcon, SentRequestButton } from '~/shared/ui/icons';
import { A } from '@solidjs/router';

export const BaseLayout: Component<{
  children?: JSX.Element;
}> = (props) =>
{
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);
  const resolved = children(() => props.children);

  return (
    <div class='relative flex h-screen w-full overflow-hidden transition-colors z-0'>
      <div
        class={classNames('flex-shrink-0 overflow-x-hidden shadow-md max-md:!w-0', {
          'w-[260px] visible': isSidebarOpen(),
          'w-0 hidden': !isSidebarOpen()
        })}
      >
        <div class='h-full w-[260px]'>
          <div class='flex h-full min-h-0 flex-col'>
            <div class='relative h-full w-full flex-1 items-start'>
              <nav class='flex h-full w-full flex-col px-3 shadow-2xl'>
                <div class='flex justify-between h-[60px] items-center md:h-[3.5rem]'>
                  <span class='flex' data-state='closed'>
                    <button
                      aria-label='Закрити бічну панель'
                      data-testid='close-sidebar-button'
                      class='h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary no-draggable'
                      onClick={() => setIsSidebarOpen(!isSidebarOpen())}
                    >
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        class='icon-xl-heavy max-md:hidden'
                      >
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        class='icon-xl-heavy md:hidden'
                      >
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <div class='flex'>
                    <button
                      aria-label='Новий чат'
                      data-testid='create-new-chat-button'
                      class='h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        id='add'
                      >
                        <path fill='none' d='M0 0h24v24H0V0z'></path>
                        <path d='M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z'></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class='flex flex-col py-2 empty:hidden dark:border-white/20'>
                  <div class='flex w-full items-center md:hidden'>
                    <div class='max-w-[100%] grow'>
                      <div class='group relative' data-headlessui-state=''>
                        <button
                          class='flex w-full max-w-[100%] items-center gap-2 rounded-lg p-2 text-sm hover:bg-token-sidebar-surface-secondary group-ui-open:bg-token-sidebar-surface-secondary'
                          data-testid='accounts-profile-button'
                          id='headlessui-menu-button-:r4:'
                          type='button'
                          aria-haspopup='true'
                          aria-expanded='false'
                          data-headlessui-state=''
                        >
                          <div class='flex-shrink-0'>
                            <div class='flex items-center justify-center overflow-hidden rounded-full'>
                              <div class='relative flex'>
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
                          <div class='flex items-center gap-0 overflow-hidden'>
                            <div class='flex items-center'>
                              <button
                                aria-label='Відкрити бічну панель'
                                onClick={() => setIsSidebarOpen(!isSidebarOpen())}
                                class='h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-main-surface-secondary enabled:hover:bg-token-main-surface-secondary'
                              >
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  class='icon-xl-heavy'
                                >
                                  <path
                                    fill-rule='evenodd'
                                    clip-rule='evenodd'
                                    d='M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z'
                                    fill='currentColor'
                                  ></path>
                                </svg>
                              </button>
                              <button
                                aria-label='Новий чат'
                                class='h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  id='add'
                                >
                                  <path fill='none' d='M0 0h24v24H0V0z'></path>
                                  <path d='M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z'></path>
                                </svg>
                              </button>
                            </div>
                          </div>
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