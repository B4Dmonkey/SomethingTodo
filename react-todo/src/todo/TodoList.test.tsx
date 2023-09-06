import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  it("should render current Todo's", async () => {
    const listItems = [
      { id: 1, title: "test item 1", completed: true },
      { id: 2, title: "test item 2", completed: false },
    ];

    render(
      <TodoList
        listItems={listItems}
        selectedItems={[]}
        handleOnCheckItem={() => null}
      />
    );

    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
  });

  it("should have a click able checkbox", async () => {
    // ! Testing a component that uses a custom hook is hard
    const user = userEvent.setup();
    const listItems = [
      { id: 1, title: "test item 1", completed: true },
      { id: 2, title: "test item 2", completed: false },
    ];

    const { rerender } = render(
      <TodoList
        listItems={listItems}
        selectedItems={[]}
        handleOnCheckItem={() => null}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    const secondCheckbox = checkboxes[1];

    expect(secondCheckbox).not.toBeChecked();

    await user.click(secondCheckbox);
    rerender(
      <TodoList
        listItems={listItems}
        selectedItems={[listItems[1]]}
        handleOnCheckItem={() => null}
      />
    );

    expect(secondCheckbox).toBeChecked();
  });
});
