import { useState } from "react";

export interface todoItem {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: Date;
}
export const useTodoList = () => {
  const [todoList, setTodoList] = useState<todoItem[]>([]);

  const addTodo = (todoItem: string) => {
    setTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        title: todoItem,
        completed: false,
      },
    ]);
  };

  return { todoList, addTodo };
};
