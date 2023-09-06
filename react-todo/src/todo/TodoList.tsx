import type { TodoItem } from "./api";

interface TodoListProps {
  listItems: TodoItem[];
  selectedItems: TodoItem[];
  handleOnCheckItem: (id: number) => void;
}

export const TodoList = ({
  listItems,
  selectedItems,
  handleOnCheckItem,
}: TodoListProps) => {
  // ! We can't use this as a shared state. We would need a context manager instead
  // const { selectedItems, handleOnCheckItem } = useTodoList();

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
