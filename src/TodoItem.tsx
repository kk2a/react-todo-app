import React from "react";
import { Todo } from "./types";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, isDone: boolean) => void;
  removeEach: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        />
        {todo.name}
      </div>
      <div>
        <button
          onClick={() => props.removeEach(todo.id)}
          className="rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white hover:bg-red-700"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
