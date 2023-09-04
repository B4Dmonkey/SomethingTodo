import type { TodoItem } from "./api";
import { useTodoList } from "./useTodoList";

interface TodoListProps {
  listItems: TodoItem[];
}

export const TodoList = ({ listItems }: TodoListProps) => {
  const { selectedItems, handleOnCheckItem } = useTodoList();

  return (
    <ul>
      {listItems.map((todo: TodoItem) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={!!selectedItems.find((curItem) => curItem?.id === todo.id)}
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
