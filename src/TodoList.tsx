import React from "react";
import { Todo, TodoId, TodoIsDone } from "./types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: TodoId, isDone: TodoIsDone) => void;
  removeEach: (id: TodoId) => void;
};

const TodoList = (props: Props) => {
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeEach={props.removeEach}
          updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;