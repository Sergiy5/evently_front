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
  };
  tickets: number;
  price: number;
}
