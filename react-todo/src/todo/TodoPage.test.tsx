import { act, render, screen } from "@testing-library/react";
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

  it.skip("should add item to list on button submit", () => {
    const user = userEvent.setup();
    render(<TodoPage />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();

    const input = screen.getByRole("textbox");
    user.type(input, "test item");
    user.click(screen.getByRole("button"));
    expect(screen.getByRole("list")).toHaveTextContent("test item");
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
});
