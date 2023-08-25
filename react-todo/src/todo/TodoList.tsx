import type { TodoItem } from "./api";

interface TodoListProps {
  listItem: TodoItem[];
}

export const TodoList = ({ listItem }: TodoListProps) => {
  return (
    <ul>
      {listItem.map((todo: TodoItem) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} />
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
};
