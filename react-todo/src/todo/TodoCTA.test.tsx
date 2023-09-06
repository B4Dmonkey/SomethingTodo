import { render, screen } from "@testing-library/react";
import { TodoCTA } from "./TodoCTA";

describe("TodoCTA", () => {
  it("should default render an add button", () => {
    render(<TodoCTA selectedItems={[]} onAddTodo={() => null} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Add Todo");
  });

  it("should render a delete and completed button when hasSelectedTodo is true", () => {
    render(
      <TodoCTA
        selectedItems={[{ id: 1, title: "test item 1", completed: false }]}
        onAddTodo={() => null}
      />
    );

    const deleteButton = screen.getByText("Delete");
    const completedButton = screen.getByText("Completed");
    const addButton = screen.queryByText("Add Todo");

    expect(deleteButton).toBeVisible();
    expect(completedButton).toBeVisible();
    expect(addButton).not.toBeInTheDocument();
  });
});
