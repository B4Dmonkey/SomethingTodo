import { render, screen, waitFor } from "@testing-library/react";
import { TodoCTA } from "./TodoCTA";
import userEvent from "@testing-library/user-event";
import api from "./api";

describe("TodoCTA", () => {
  it("should default render an add button", () => {
    render(
      <TodoCTA
        selectedItems={[]}
        onAddTodo={() => null}
        onDeleteTodo={() => null}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Add Todo");
  });

  it("should render a delete and completed button when hasSelectedTodo is true", () => {
    render(
      <TodoCTA
        selectedItems={[{ id: 1, title: "test item 1", completed: false }]}
        onAddTodo={() => null}
        onDeleteTodo={() => null}
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

describe("UpdateTodoCTA", () => {
  it.skip("should call delete handler", async () => {
    // ? This might be the wrong place for this test ?
    const user = userEvent.setup();
    const mockHandleDelete = jest.fn();
    render(
      <TodoCTA
        selectedItems={[{ id: 1, title: "test item 1", completed: false }]}
        onAddTodo={() => null}
        onDeleteTodo={mockHandleDelete}
      />
    );

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeVisible();

    await waitFor(async () => {
      await user.click(deleteButton);
      expect(mockHandleDelete).toHaveBeenCalled();
    });
  });
});
