// this file is for static data that can be used like props for CustoomSelect.tsx

export interface Option {
    label: string;
    value: string;
  }

export const eventOptions: Option[] = [
    { label: 'Усі події', value: 'all-events' },
    { label: 'Популярні', value: 'popular' },
    { label: 'Під домом', value: 'nearby' },
    { label: 'Концерти', value: 'concerts' },
    { label: 'Майстер-клас', value: 'workshop' },
    { label: 'Stand-Up', value: 'stand-up' },
    { label: 'Бізнес та нетворкінг', value: 'business-networking' },
    { label: 'Спортивні заходи', value: 'sports-events' },
  ];

export const cityOptions: Option[] = [
    {label: 'Київ', value: 'Kyiv'},
    {label: 'Одеса', value: 'Odessa'},
    {label: 'Львів', value: 'Lviv'},
    {label: 'Харків', value: 'Kharkiv'},
    {label: 'Дніпро', value: 'Dnipro'},
]

export const laguageOptions: Option[] = [
    {label: 'UA', value: 'UA'},
    {label: 'EN', value: 'EN'}
]