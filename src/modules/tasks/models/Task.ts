export default interface Task {
  id: string;
  user_id: string;
  department_id?: string;
  name: string;
  description?: string;
  status: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}
