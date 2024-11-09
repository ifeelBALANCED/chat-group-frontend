import { Icon } from '@/shared/ui/icon';
import { useForm } from 'effector-forms';
import {
  FormEventHandler, KeyboardEvent, useEffect, useRef, useState
} from 'react';
import { chatGroupModel } from '@/features/chat-group';
import { useUnit } from 'effector-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { SafeView } from '@/shared/ui/safe-view';

export const SendChatMessageForm = () =>
{
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const isSending = useUnit(chatGroupModel.createChatMessageHandler.$loading);
  const {
    fields, submit, isValid, values
  } = useForm(chatGroupModel.createChatMessageForm);

  const disabled = isSending || !isValid || !values.content.trim().length;

  const handleSubmit: FormEventHandler = (e) =>
  {
    e.preventDefault();
    if(!disabled)
    {
      submit();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) =>
  {
    if(e.key === 'Enter' && !e.shiftKey)
    {
      e.preventDefault();
      if(!disabled)
      {
        submit();
      }
    }
  };

  const handleEmojiSelect = (emoji: any) =>
  {
    fields.content.onChange(fields.content.value + emoji.native);
    setIsEmojiPickerOpen(false);
  };

  useEffect(() =>
  {
    const handleClickOutside = (event: MouseEvent) =>
    {
      if(
        pickerRef.current && !pickerRef.current.contains(event.target as Node) && !emojiButtonRef.current?.contains(event.target as Node)
      )
      {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className='send-chat-message-form relative'>
      <div className='flex items-center gap-2'>
        <div className='flex-1'>
          <textarea
            value={fields.content.value}
            maxLength={500}
            onChange={(e) => fields.content.onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className='textarea textarea-bordered w-full h-16 resize-none bg-transparent text-base-content dark:text-white placeholder-base-content'
            placeholder='Type your message...'
          />
        </div>

        <div className='flex gap-2 items-center'>
          <div className='relative'>
            <button
              type='button'
              ref={emojiButtonRef}
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className='btn btn-circle btn-ghost btn-sm'
              aria-label='Open emoji picker'
            >
              <Icon name='sprite/emoji' fontSize={32} />
            </button>

            <SafeView for={isEmojiPickerOpen} otherwise={null}>
              <div
                ref={pickerRef}
                className='absolute bottom-full right-0 mb-2 z-50 dropdown-content'
              >
                <div className='bg-base-100 rounded-box shadow-lg'>
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme='light'
                    skinTonePosition='none'
                  />
                </div>
              </div>
            </SafeView>
          </div>

          <button
            type='submit'
            disabled={disabled}
            aria-label='Send Message'
            data-testid='send-button'
            className='btn btn-circle bg-black text-white hover:opacity-70 disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:disabled:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary focus-visible:outline-none focus-visible:outline-black dark:focus-visible:outline-white'
          >
            <Icon name='sprite/send-request-icon' fontSize={24} />
          </button>
        </div>
      </div>
    </form>
  );
};