import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoPage } from "./TodoPage";

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

  it("should add item to list on button submit", () => {
    const user = userEvent.setup();
    render(<TodoPage />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();

    const input = screen.getByRole("textbox");
    user.type(input, "test item");
    user.click(screen.getByRole("button"));
    screen.debug();
    expect(screen.getByRole("list")).toHaveTextContent("test item");
  });
});
