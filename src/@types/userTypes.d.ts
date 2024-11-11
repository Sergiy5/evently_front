interface User {
  id: string;
  name: string;
  email: string;
  creationDate: Date;
  mailConfirmation: boolean;
  role: 'VISITOR' | 'ORGANIZER' | 'ADMIN';
  location: string;
  phone: string;
  status: 'ACTIVE' | 'BANNED';
}
