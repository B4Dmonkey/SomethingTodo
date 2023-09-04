import { act, render, screen, waitFor } from "@testing-library/react";
import { TodoList } from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  it("should render current Todo's", async () => {
    const listItems = [
      { id: 1, title: "test item 1", completed: true },
      { id: 2, title: "test item 2", completed: false },
    ];

    render(<TodoList listItems={listItems} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
  });

  it.only("should have a click able checkbox", async () => {
    // ! Testing a component that uses a custom hook is hard
    // ! going to skip this for now since it works in the browser
    const user = userEvent.setup();

    const listItems = [
      { id: 1, title: "test item 1", completed: true },
      { id: 2, title: "test item 2", completed: false },
    ];

    render(<TodoList listItems={listItems} />);

    const checkboxes = screen.getAllByRole("checkbox");
    const secondCheckbox = checkboxes[1];

    expect(secondCheckbox).not.toBeChecked();

    // ! Because were using a custom hook we need to wait for the component to update
    // ! We are testing a state change that we don't necessarily care about
    await waitFor(() => user.click(secondCheckbox));

    expect(secondCheckbox).toBeChecked();
  });
});
