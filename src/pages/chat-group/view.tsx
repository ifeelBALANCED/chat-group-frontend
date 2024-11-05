import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { $chatGroupMessages, ChatGroupGate } from '@/entities/chat-group';
import { ChatGroupMessage } from '@/shared/types/chat.types';
import { sessionModel } from '@/entities/session';
import { SendChatMessageForm } from '@/features/chat-group';
import { map } from 'lodash';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { ScrollToBottomButton } from '@/shared/ui/scroll-to-bottom-button';

const formatTime = (dateString: string): string => new Date(dateString).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit'
});

interface ChatMessageProps {
  message: ChatGroupMessage;
  isCurrentUser: boolean;
}

const ChatMessage = ({ message, isCurrentUser }: ChatMessageProps) => (
  <div
    className={classNames('chat', { 'chat-end': isCurrentUser, 'chat-start': !isCurrentUser }, 'mb-4')}
  >
    <div className='chat-header mb-1'>
      <span className='text-sm font-bold'>{isCurrentUser ? 'You' : message.sender_nickname}</span>
      <time className='text-xs opacity-50 ml-2'>{formatTime(message.sent_at)}</time>
    </div>
    <div
      className={classNames('chat-bubble max-w-xs sm:max-w-sm md:max-w-md', {
        'chat-bubble-primary text-primary-content': isCurrentUser,
        'chat-bubble': !isCurrentUser
      })}
    >
      {message.content}
    </div>
  </div>
);

export const ChatGroupPage = () =>
{
  const { id } = useParams();
  useGate(ChatGroupGate, { id: id ?? '' });
  const [user, chatGroupMessages] = useUnit([sessionModel.$user, $chatGroupMessages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
  {
    if(messagesEndRef.current)
    {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() =>
  {
    scrollToBottom();
  }, [chatGroupMessages]);

  useEffect(() =>
  {
    if(containerRef.current)
    {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className='flex flex-col h-[calc(100%_-_70px)]'>
      <div ref={containerRef} className='flex-1 overflow-y-auto p-4'>
        {map(chatGroupMessages, (message) => (
          <ChatMessage
            key={message.chat_uuid}
            message={message}
            isCurrentUser={user?.user_uuid === message.sender_uuid}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ScrollToBottomButton containerRef={containerRef} onScroll={scrollToBottom} />
      <div className='p-4 border-t'>
        <SendChatMessageForm />
      </div>
    </div>
  );
};