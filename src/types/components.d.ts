export interface IEvent {
  id: number;
  status: string;
  rating: number;
  title: string;
  category: string;
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
  price: string;
}
