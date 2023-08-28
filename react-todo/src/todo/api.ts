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
  update: async (id: number, todoItem: Partial<TodoItem>): Promise<void> =>
    await fetch(`${HOST}/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    }).then((res) => res.json()),
  delete: undefined,
};
