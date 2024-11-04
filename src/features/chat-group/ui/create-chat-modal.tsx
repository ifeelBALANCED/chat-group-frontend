import { useGate, useUnit } from 'effector-react';
import { $searchableMembers } from '../model';
import { Icon } from '@/shared/ui/icon';
import { SearchableSelect } from '@/shared/ui/searchable-input';
import { useForm } from 'effector-forms';
import { searchUserForm } from '@/features/chat-group/model/form';
import { FormEventHandler } from 'react';
import { newChatModalApi, NewChatModalGate } from '@/entities/chat-group';

export const CreateChatModal = () =>
{
  useGate(NewChatModalGate);

  const {
    fields, isValid, values, submit
  } = useForm(searchUserForm);

  const disabled = !values.user || !isValid;

  const [onClose, searchableMembers, isOpen] = useUnit([
    newChatModalApi.modalClosed,
    $searchableMembers,
    newChatModalApi.$modal
  ]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
  {
    e.preventDefault();
    submit();
  };

  if(!isOpen)
  {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative'>
        <button
          aria-label='Close'
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none'
          onClick={onClose}
        >
          <Icon name='sprite/close' fontSize={24} />
        </button>

        <h2 className='text-xl font-semibold text-gray-800 mb-6'>Select Chat Members</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className='mb-4'>
            <SearchableSelect
              options={searchableMembers}
              field={fields.user}
              placeholder='Select a user...'
              required
              name='user'
            />
          </div>

          <div className='flex justify-end'>
            <button type='submit' className='btn btn-primary' disabled={disabled}>
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};