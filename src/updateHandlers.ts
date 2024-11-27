import { ChangeEvent } from "react";
import {
  Todo,
  TodoId,
  TodoPriority,
  TodoDeadline,
  TodoIsDone,
  TodoName,
  TodoMemo,
  INIT_DEADLINE,
} from "./types";

export const updatePriorityBase = (
  e: ChangeEvent<HTMLInputElement>,
  setNewTodoPriority: (priority: TodoPriority) => void
) => {
  const priority = e.target.value as unknown as TodoPriority;
  setNewTodoPriority(Math.max(0, Math.min(1000, priority)));
};

export const updateDeadlineBase = (
  e: ChangeEvent<HTMLInputElement>,
  setNewTodoDeadline: (date: TodoDeadline) => void
) => {
  console.log(e.target.value);
  if (e.target.value === "") {
    setNewTodoDeadline(INIT_DEADLINE);
    return;
  }
  setNewTodoDeadline(new Date(e.target.value));
};

export const updateIsDoneBase = (
  id: TodoId,
  isDone: TodoIsDone,
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone };
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
};

export const updateNameBase = (
  e: ChangeEvent<HTMLInputElement>,
  setNewTodoName: (name: TodoName) => void
) => {
  setNewTodoName(e.target.value);
};

export const updateMemoBase = (
  e: ChangeEvent<HTMLInputElement>,
  setNewTodoMemo: (memo: TodoMemo) => void
) => {
  setNewTodoMemo(e.target.value);
};

export const openPopupBase = (setIsPopupOpen: (isOpen: boolean) => void) => {
  setIsPopupOpen(true);
};

export const closePopupBase = (setIsPopupOpen: (isOpen: boolean) => void) => {
  setIsPopupOpen(false);
};
