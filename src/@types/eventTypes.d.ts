interface Event {
  category: 'TOP_EVENTS' | string | null;
  creationDate: Date;
  date: {
    day: string;
    time: string;
  };
  description: string;
  id: string;
  location: {
    city: string;
    street: string | null;
    venue: string | null;
  };
  numberOfTickets: number;
  organizers: [];
  phoneNumber: string;
  photoUrl: string;
  price: number;
  rating: number;
  tickets: number;
  title: string;
  type: string;
}
