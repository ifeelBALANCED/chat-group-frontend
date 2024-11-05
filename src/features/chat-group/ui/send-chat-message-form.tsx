import { Icon } from '@/shared/ui/icon';
import { useForm } from 'effector-forms';
import { FormEventHandler, KeyboardEvent } from 'react';
import { chatGroupModel } from '@/features/chat-group';
import { useUnit } from 'effector-react';

export const SendChatMessageForm = () =>
{
  const isSending = useUnit(chatGroupModel.createChatMessageHandler.$loading);
  const { fields, submit, isValid } = useForm(chatGroupModel.createChatMessageForm);
  const disabled = isSending || !isValid;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
  {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent) =>
  {
    if(e.key === 'Enter' && !e.shiftKey)
    {
      e.preventDefault();
      if(isValid)
      {
        submit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='relative w-full flex items-center py-2'>
      <div className='w-full flex flex-col gap-2 p-4 rounded-lg transition-colors'>
        <div className='flex items-center gap-2'>
          <div className='flex-grow'>
            <div className='relative'>
              <textarea
                value={fields.content.value}
                onChange={(e) => fields.content.onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className='textarea textarea-bordered w-full h-16 resize-none bg-transparent text-base-content dark:text-white placeholder-base-content'
                placeholder='Type your message...'
              />
            </div>
          </div>
          <div className='min-w-8'>
            <button
              type='submit'
              disabled={disabled}
              aria-label='Надіслати запит'
              data-testid='send-button'
              className='mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary disabled:bg-[#D7D7D7]'
            >
              <Icon name='sprite/send-request-icon' fontSize={24} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};