import { TodoCTA } from "./TodoCTA";
import { TodoList } from "./TodoList";
import { useTodoList } from "./useTodoList";

export const TodoPage = () => {
  const { todoList, addTodo } = useTodoList();
  return (
    <div className="container mx-auto grid grid-cols-2">
      {/* <div>
        <p>Some Date Picker</p>
        <p>Some summary</p>
      </div> */}
      <div>
        <TodoList listItem={todoList} />
        <TodoCTA onAddTodo={addTodo} />
      </div>
    </div>
  );
};
