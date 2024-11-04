import { createForm } from 'effector-forms';
import { createRule } from '@/shared/lib/create-rule';
import * as yup from 'yup';

export const searchUserForm = createForm<{ user: string }>({
  fields: {
    user: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Email is required'),
          name: 'required'
        })
      ]
    }
  },
  validateOn: ['submit', 'change']
});