import React from 'react';
import { redirect } from 'react-router';
import { createEvent, editEvent } from '../../utils/eventsHttp';
import EventForm from '../../components/events/EventForm';

const EventEdit: React.FC = () => {
  const event = useLoaderData() as eventType;
  const {
    register,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });

  return (
    <>
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
    </>
  );
};

export default EventEdit;

export const action = async (request: any, id?: string) => {
  const fd = await request.formData();
  const formData = Object.fromEntries(fd);

  if (id === 'new') {
    await createEvent(formData);
    return redirect('/evently_front/events');
  } else {
    await editEvent(formData, id);
    return redirect('/evently_front/events/' + id);
  }
};
