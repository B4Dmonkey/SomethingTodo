import { TodoCTA } from "./TodoCTA";
import { TodoList } from "./TodoList";
import { useTodoList } from "./useTodoList";

export const TodoPage = () => {
  const { todoList, addTodo, selectedItems, handleOnCheckItem } = useTodoList();

  return (
    <div className="container mx-auto">
      <h1>
        Dale Dimmadone son of Doug Dimmadone owner of the Dimmsdale Dimmadone To
        Do Things List
      </h1>
      {/* <div>
        <p>Some Date Picker</p>
        <p>Some summary</p>
      </div> */}
      <TodoList
        listItems={todoList}
        selectedItems={selectedItems}
        handleOnCheckItem={handleOnCheckItem}
      />
      <TodoCTA selectedItems={selectedItems} onAddTodo={addTodo} />
    </div>
  );
};
