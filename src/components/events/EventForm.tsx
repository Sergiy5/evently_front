import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { useLoaderData } from 'react-router';

import { SharedInput } from '../ui';
import { eventType } from './types';
import { useState } from 'react';

const EventForm = () => {
  const [idSchema, setIdSchema] = useState<string>();
  const [library, setLibrary] = useState<string[]>([]);
  const event = useLoaderData() as eventType;
  const {
    register,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: 'onChange',
  });

  function addPhoto(photo: string) {
    setLibrary(state => {
      const prevState = [...state];
      prevState.push(photo);
      return prevState;
    });
  }

  console.log(library);

  return (
    <Form method={'put'}>
      <button disabled={!isValid}>Save</button>
      <div className="flex flex-col gap-8">
        <SharedInput
          label="Title"
          id="name"
          type="string"
          register={register}
          autocomplete="title"
          validation={{
            validate(value) {
              if (value.length === 0) {
                return 'Title required';
              }
              if (value.length < 6) {
                return 'Title min length = 6';
              }
              return true;
            },
          }}
          errors={errors}
          defaultValue={event.name || ''}
        />
        <SharedInput
          label="Image"
          id="logo"
          type="file"
          register={register}
          autocomplete="logo"
          errors={errors}
        />
        <SharedInput
          label="Description"
          id="desc"
          autocomplete="desc-event"
          type="string"
          register={register}
          errors={errors}
          defaultValue={event.desc}
        />
        <SharedInput
          label="Time"
          id="time"
          autocomplete="time"
          type="time"
          register={register}
          errors={errors}
          defaultValue={event.time}
        />
        <div className="flex flex-row gap-8">
          <SharedInput
            label="Country"
            id="country"
            autocomplete="country"
            type="string"
            register={register}
            errors={errors}
            defaultValue={event.country}
            validation={{ required: true }}
          />
          <SharedInput
            label="City"
            id="city"
            autocomplete="city"
            type="string"
            register={register}
            errors={errors}
            defaultValue={event.city}
            validation={{ required: true }}
          />
          <SharedInput
            label="Street"
            id="street"
            autocomplete="street"
            type="string"
            register={register}
            errors={errors}
            defaultValue={event.street}
            validation={{ required: true }}
          />
          <SharedInput
            label="Number"
            id="number"
            autocomplete="number"
            type="string"
            register={register}
            errors={errors}
            defaultValue={event.number}
            validation={{ required: true }}
          />
        </div>
        <SharedInput
          label="Count Seats"
          id="seats"
          autocomplete="seats"
          type="number"
          register={register}
          errors={errors}
          defaultValue={`${event.countSeats}`}
        />
        <div>
          <select
            name="schema"
            onChange={event => setIdSchema(event.target.value)}
          >
            <option value={'Не вибрано'}>Не вибрано</option>
            <option value="0">Schema 1</option>
            <option value="1">Schema 2</option>
            <option value="2">Schema 3</option>
            <option value="3">Schema 4</option>
          </select>
          {[
            { id: 0, color: 'bg-red-100' },
            { id: 1, color: 'bg-red-200' },
            { id: 2, color: 'bg-red-300' },
            { id: 3, color: 'bg-red-400' },
          ].map(schema => (
            <div
              key={schema.id}
              className={`w-20 h-20 ${schema.id.toString() === idSchema ? 'flex' : 'hidden'} ${schema.color}`}
            ></div>
          ))}
        </div>
        <div>
          <input
            defaultValue={library.toString()}
            name="library"
            className="hidden"
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={event => addPhoto(event.target.value)}
          />
          {library.map(photo => (
            <img className="w-20 h-20" key={photo} src={photo} />
          ))}
        </div>
        <div />
      </div>
    </Form>
  );
};

export default EventForm;
