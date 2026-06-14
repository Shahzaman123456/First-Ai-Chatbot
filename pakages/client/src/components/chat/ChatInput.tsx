import { Button } from '#components/ui/button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import type { KeyboardEvent } from 'react';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>({
      mode: 'onChange',
   });

   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   const handleKeydown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <form
         onSubmit={submit}
         onKeyDown={handleKeydown}
         className="flex  flex-col gap-4 items-end border-2 p-4 rounded-2xl "
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            autoFocus
            className="w-full border-0 focus:outline-0"
            placeholder="Ask Anything"
            maxLength={1000}
         ></textarea>

         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            {' '}
            <FaArrowUp />{' '}
         </Button>
      </form>
   );
};

export default ChatInput;
