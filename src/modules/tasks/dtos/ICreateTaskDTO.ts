export default interface ICreateTaskDTO {
  user_id: string;
  name: string;
  date: Date;
  description?: string;
}
