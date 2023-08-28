import type { TodoItem } from "./api";
import { useTodoList } from "./useTodoList";

interface TodoListProps {
  listItem: TodoItem[];
}

export const TodoList = ({ listItem }: TodoListProps) => {
  const { handleOnCheckItem } = useTodoList();
  return (
    <ul>
      {listItem.map((todo: TodoItem) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              handleOnCheckItem(todo.id);
            }}
          />
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
};
