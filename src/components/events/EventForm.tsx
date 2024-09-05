import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { useLoaderData } from 'react-router';

import { SharedInput } from '../ui';
import { eventType } from './types';

const EventForm = () => {
  const event = useLoaderData() as eventType;
  const {
    register,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });

  return (
    <Form method={'put'}>
      <button>Save</button>
      <SharedInput
        label="ID"
        id="id"
        type="number"
        register={register}
        validation={{ required: true }}
        errors={errors}
        defaultValue={event.id.toString()}
      />
      <SharedInput
        label="Title"
        id="title"
        type="string"
        register={register}
        validation={{
          validate(value) {
            if (value.length === 0) {
              return 'Title required';
            }
            if (value.length < 8) {
              return 'Title min length = 8';
            }
            return true;
          },
        }}
        errors={errors}
        defaultValue={event.name}
      />
    </Form>
  );
};

export default EventForm;
