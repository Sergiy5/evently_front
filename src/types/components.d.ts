interface Event {
  id: number;
  category: string;
  status: string;
  rating: number;
  title: string;
  type: string;
  photoUrl: string;
  date: {
    day: string;
    time: string;
  };
  //   end: {
  //     day: string;
  //     time: string;
  //   };
  location: {
    city: string;
    street: string | null,
    venue: string | null,
  };
  tickets: number;
  price: number;
}
