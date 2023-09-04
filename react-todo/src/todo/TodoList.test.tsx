import { act, render, screen } from "@testing-library/react";
import { TodoPage } from "./TodoPage";
import api from "./api";

describe("TodoList", () => {
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
