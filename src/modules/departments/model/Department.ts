import User from '@modules/users/models/user';

export default interface Department {
  id: string;
  owner_id: string;
  name: string;
  users: User[];
  created_at: Date;
  updated_at: Date;
}
