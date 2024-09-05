export interface eventType {
  id: number;
  name: string;
  logo?: string;
  desc?: string;
  time: string;
  date: string;
  country: string;
  city: string;
  street: string;
  number: string;
  countSeats: number | 'Необмежено';
  schemaSeats: number | 'Не вибрано';
  library?: File[];
}

export interface location {
  country: string;
  city: string;
  street: string;
  number: string;
}
