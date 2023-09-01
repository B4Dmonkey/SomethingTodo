import api from "./api";
import { useTodoList } from "./useTodoList";
import { act, renderHook } from "@testing-library/react";

describe("useTodoList", () => {
  it("should fetch the todo list", async () => {
    const readAllSpy = jest
      .spyOn(api, "readAll")
      .mockResolvedValue([{ id: 1, title: "test", completed: false }]);
    // ! Generates noise in the console. React says testing should be done in act
    // ! https://reactjs.org/docs/testing-recipes.html#act
    // ! Testing library says don't use act
    // ! https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#wrapping-things-in-act-unnecessarily
    // ! What do you do when your convenience library aren't convenient?
    const { result } = renderHook(() => useTodoList());

    // ! To solve we need to do this
    // ! https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await act(async () => readAllSpy);

    expect(readAllSpy).toHaveBeenCalled();
    expect(result.current.todoList).toEqual([
      { id: 1, title: "test", completed: false },
    ]);
  });
});
