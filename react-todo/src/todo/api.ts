/* eslint-disable import/no-anonymous-default-export */
export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

const HOST = "http://localhost:3000";

export default {
  create: undefined,
  readAll: async (): Promise<TodoItem[]> =>
    await fetch(`${HOST}/api`).then((res) => res.json()),
  update: undefined,
  delete: undefined,
};
