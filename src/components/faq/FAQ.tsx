import { Container } from '../container/Container';
import React, { useState, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#E9E6FF] to-[#D5FEFF]">
        <button
          className="w-full flex justify-between items-center p-6 text-left text-lg font-medium text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <h2>{title}</h2>

          <BiChevronDown
            className={`w-6 h-6 transition-transform duration-200 ease-in-out ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        <div
          ref={contentRef}
          style={{
            height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
          }}
          className={`transition-[height] duration-300 ease-in-out`}
        >
          <div className=" pb-9 px-6 text-gray-600 text-base">{content}</div>
        </div>
      </div>
    </Container>
  );
};

export const FAQ: React.FC = () => {
  const items = [
    {
      title: 'Чи можу я повернути квиток, якщо не зможу відвідати подію?',
      content:
        'Так, повернення квитків доступно не пізніше, ніж за 24 години до початку події.',
    },
    {
      title: 'Чи можу я передати свій квиток іншій особі?',
      content:
        'Зазвичай так, але це залежить від умов організатора. Перевірте інформацію на сторінці події.',
    },
    {
      title: 'Чи можу я редагувати інформацію про подію після публікації?',
      content:
        'Так, зайдіть у свій акаунт>Мої події>відредагувати. Та дочекайтесь підтвердження змін від модератора BookMyEvent.',
    },
    {
      title: 'Як я можу вивести кошти від продажу квитків?',
      content:
        'Всі отримані кошти від квитків ви отримуєте на рахунок аккаунта, які можна вивести на будь-яку банківську карту.',
    },
  ];

  return (
    <div className="w-[872px] mt-[64px] m-auto space-y-4 pb-[50px] relative">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
      <h1 className='absolute top-[-20px] left-[-220px] w-[89px] leanding-[94.85px] text-[64px]'>FAQ</h1>
    </div>
  );
};
