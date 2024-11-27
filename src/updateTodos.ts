import {
  Todo,
  TodoId,
  TodoName,
  TodoDeadline,
  TodoMemo,
  TodoPriority,
  INIT_IS_DONE,
  INIT_NAME,
  INIT_PRIORITY,
  INIT_DEADLINE,
} from "./types";
import { v4 as uuid } from "uuid";

export const addNewTodoBase = (
  todos: Todo[],
  newTodoName: TodoName,
  newTodoPriority: TodoPriority,
  newTodoDeadline: TodoDeadline,
  newTodoMemo: TodoMemo,
  setTodos: (todos: Todo[]) => void,
  setNewTodoName: (name: TodoName) => void,
  setNewTodoPriority: (priority: TodoPriority) => void,
  setNewTodoDeadline: (date: TodoDeadline) => void
) => {
  if (newTodoName.length < 1) {
    return;
  }
  const newTodo: Todo = {
    id: uuid(),
    name: newTodoName,
    isDone: INIT_IS_DONE,
    priority: newTodoPriority,
    deadline: newTodoDeadline,
    memo: newTodoMemo,
  };
  setTodos([...todos, newTodo]);
  setNewTodoName(INIT_NAME);
  setNewTodoPriority(INIT_PRIORITY);
  setNewTodoDeadline(INIT_DEADLINE);
};

export const removeCompletedTodosBase = (
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) => {
  const updatedTodos = todos.filter((todo: Todo) => !todo.isDone);
  setTodos(updatedTodos);
};

export const removeEachBase = (
  id: TodoId,
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) => {
  const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
  setTodos(updatedTodos);
};

export const editTodoBase = (
  id: TodoId,
  name: TodoName,
  priority: TodoPriority,
  deadline: TodoDeadline,
  memo: TodoMemo,
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) => {
  const updatedTodos = todos.map((todo: Todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        name: name,
        priority: priority,
        deadline: deadline,
        memo: memo,
      };
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
};

export const sortByPriorityBase = (
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) => {
  const sortedTodos = todos.sort((a: Todo, b: Todo) => b.priority - a.priority);
  setTodos([...sortedTodos]);
};

export const sortByDeadlineBase = (
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) => {
  const sortedTodos = todos.sort(
    (a: Todo, b: Todo) =>
      new Date(a.deadline).valueOf() - new Date(b.deadline).valueOf()
  );
  setTodos([...sortedTodos]);
};
