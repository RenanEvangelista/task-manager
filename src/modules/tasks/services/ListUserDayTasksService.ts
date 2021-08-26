interface IRequest {
  user_id: string;
  date: Date;
}

class ListUserDayTasksService {
  async execute({ user_id, date }: IRequest): Promise<void> {}
}

export default ListUserDayTasksService;
