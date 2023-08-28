import { useEffect, useState } from "react";
import api from "./api";
import type { TodoItem } from "./api";

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  
  const fetchTodoList = async () => setTodoList(await api.readAll());

  useEffect(() => {
    console.log('fetching the list')
    fetchTodoList();
  },[]);

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
