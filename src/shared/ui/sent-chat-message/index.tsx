import { SentRequestButton } from '@/shared/ui/sent-request-button';

export const SendChatMessage = () => (
  <div className='relative w-full flex items-center py-2'>
    <div className='w-full flex flex-col gap-2 p-4 rounded-lg dark:bg-neutral transition-colors'>
      <div className='flex items-center gap-2'>
        <div className='flex-grow'>
          <div className='relative'>
            <textarea
              className='textarea textarea-bordered w-full h-16 resize-none bg-transparent text-base-content dark:text-white placeholder-base-content'
              placeholder='Type your message...'
            />
          </div>
        </div>
        <SentRequestButton />
      </div>
    </div>
  </div>
);