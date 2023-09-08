import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoPage } from "./TodoPage";
import api from "./api";

describe("TodoPage", () => {
  it("should render the header", () => {
    render(<TodoPage />);
    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("To Do");
  });

  it("should render a input", () => {
    render(<TodoPage />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should render a button", () => {
    render(<TodoPage />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should render current Todo's", async () => {
    const readAllSpy = jest.spyOn(api, "readAll").mockResolvedValue([
      { id: 1, title: "test item 1", completed: true },
      { id: 2, title: "test item 2", completed: false },
    ]);

    render(<TodoPage />);

    await act(async () => readAllSpy);

    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
  });

  it("should delete an item", async () => {
    const user = userEvent.setup();

    const readAllSpy = jest.spyOn(api, "readAll").mockResolvedValue([
      { id: 1, title: "test item 1", completed: true },
      { id: 2, title: "test item 2", completed: false },
    ]);

    const deleteSpy = jest.spyOn(api, "delete");

    render(<TodoPage />);

    await act(async () => readAllSpy);

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).not.toBeChecked();

    await waitFor(async () => {
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeVisible();

    await waitFor(async () => {
      await user.click(deleteButton);
      expect(deleteSpy).toBeCalledWith(1);
    });
  });

  it.skip("should update an item", async () => {
    const user = userEvent.setup();

    const readAllSpy = jest
      .spyOn(api, "readAll")
      .mockResolvedValue([{ id: 1, title: "test item 1", completed: false }]);

    render(<TodoPage />);

    await act(async () => readAllSpy);

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).not.toBeChecked();

    await waitFor(async () => {
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    const updateButton = screen.getByRole("button", { name: "Completed" });
    expect(updateButton).toBeVisible();
  });

  it.skip("should add item to list on button submit", () => {
    const user = userEvent.setup();
    render(<TodoPage />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();

    const input = screen.getByRole("textbox");
    user.type(input, "test item");
    user.click(screen.getByRole("button"));
    expect(screen.getByRole("list")).toHaveTextContent("test item");
  });
});
