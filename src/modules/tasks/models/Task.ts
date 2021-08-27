export default interface Task {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}