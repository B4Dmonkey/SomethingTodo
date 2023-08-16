import React from "react";
import { render, screen } from "@testing-library/react";
import { TodoPage } from "./TodoPage";

describe("TodoPage", () => {
  it("should render the header", () => {
    render(<TodoPage />);
    expect(screen.getByRole("heading")).toContain("To Do");
  });
});
