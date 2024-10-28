export interface IEvent {
  id: number;
  category: string;
  status: string;
  rating: number;
  title: string;
  type: string;
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
