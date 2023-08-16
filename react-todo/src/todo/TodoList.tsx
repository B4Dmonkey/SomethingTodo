import { todoItem } from "./useTodoList";

interface TodoListProps {
  listItem: todoItem[];
}

export const TodoList = ({ listItem }: TodoListProps) => {
  return (
    <ul>
      {listItem.map((todo: todoItem) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} />
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
};
