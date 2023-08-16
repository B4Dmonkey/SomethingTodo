import { useState } from "react";

interface TodoCTAProps {
  onAddTodo: (val: string) => void;
}

export const TodoCTA = ({ onAddTodo }: TodoCTAProps) => {
  const [todo, setTodo] = useState<string>("");

  return (
    <div className="grid grid-cols-2 space-x-4">
      <div>
        <input
          type="text"
          placeholder="Add a todo"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
      </div>
      <div>
        <button
          className="btn btn-active"
          onClick={() => {
            onAddTodo(todo);
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};
