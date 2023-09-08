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

  const handleDeleteTodo = async () => {
    // ! Using a front end frame work for the client
    // ! Forces a pattern where you must update the client to reflect the server
    // ! Double state management
    selectedItems.forEach(async (item) => {
      await api.delete(item.id); // ! This is missing error handling. Skipping for now due to time
    });
    setSelectedItems([]);
    fetchTodoList();
  };

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

  const handleOnCheckItem = (id: number) => {
    if (id) {
      setSelectedItems([
        ...selectedItems,
        todoList.find((item) => item.id === id)!,
      ]);
    }
  };

  return {
    todoList,
    addTodo,
    handleOnCheckItem,
    selectedItems,
    handleDeleteTodo,
  };
};
