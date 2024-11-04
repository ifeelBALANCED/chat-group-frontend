import { SendChatMessage } from '@/shared/ui/sent-chat-message';
import { useParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import { ChatGroupGate } from '@/entities/chat-group';

export const ChatGroupPage = () =>
{
  const { id } = useParams();
  useGate(ChatGroupGate, { id: id ?? '' });

  return (
    <div>
      <SendChatMessage />
    </div>
  );
};