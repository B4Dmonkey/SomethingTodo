import { useEffect, useState } from "react";
import api from "./api";
import type { TodoItem } from "./api";

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<TodoItem[]>([]);

  const fetchTodoList = async () => setTodoList(await api.readAll());

  useEffect(() => {
    fetchTodoList();
    // api.readAll().then((res) => {
    //   setTodoList(res);
    // });
  }, []);

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

  const handleOnCheckItem = async (id: number) => {
    await api.update(id, { completed: !todoList[id].completed }).then(() => {
      fetchTodoList();
    });
  };

  return { todoList, addTodo, handleOnCheckItem };
};
