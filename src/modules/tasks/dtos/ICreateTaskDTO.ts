export default interface ICreateTaskDTO {
  user_id: string;
  department_id?: string;
  name: string;
  date: Date;
  status?: string;
  description?: string;
}
