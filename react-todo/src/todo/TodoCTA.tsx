import { useState } from "react";
import { TodoItem } from "./api";

interface TodoCTAProps {
  selectedItems: TodoItem[];
  onAddTodo: (val: string) => void;
  onUpdateTodo?: (val: string) => void;
  onDeleteTodo?: (val: string) => void;
}

export const TodoCTA = ({
  selectedItems,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
}: TodoCTAProps) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const hasSelectedTodo = !!selectedItems.length;

  // ! Managing state is one of the most difficult parts of programming
  // ! Having a client framework like React makes it more complex
  // ! You are often duplicating state between the client and the server
  const NewTodoCTA = (
    <>
      <input
        type="text"
        placeholder="Add a todo"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button
        className="btn btn-active"
        onClick={() => {
          onAddTodo(newTodo);
        }}
      >
        Add Todo
      </button>
    </>
  );

  const UpdateTodoCTA = (
    <>
      <button className="btn btn-active">Delete</button>
      <button className="btn btn-active">Completed</button>
    </>
  );

  return (
    <div className="grid grid-cols-2 space-x-4">
      {hasSelectedTodo ? UpdateTodoCTA : NewTodoCTA}
    </div>
  );
};
