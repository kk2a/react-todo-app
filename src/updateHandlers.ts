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
  e: ChangeEvent<HTMLTextAreaElement>,
  setNewTodoMemo: (memo: TodoMemo) => void
) => {
  setNewTodoMemo(e.target.value);
};

export const openAddPopupBase = (
  setAddIsPopupOpen: (isOpen: boolean) => void
) => {
  setAddIsPopupOpen(true);
};

export const closeAddPopupBase = (
  setAddIsPopupOpen: (isOpen: boolean) => void
) => {
  setAddIsPopupOpen(false);
};

export const openEditPopupBase = (
  todo: Todo,
  setIsPopupOpen: (isOpen: boolean) => void,
  setIsTodoId: (id: TodoId) => void,
  setEditTodoName: (name: TodoName) => void,
  setEditTodoPriority: (priority: TodoPriority) => void,
  setEditTodoDeadline: (date: TodoDeadline) => void,
  setEditTodoMemo: (memo: TodoMemo) => void
) => {
  setIsTodoId(todo.id);
  setEditTodoName(todo.name);
  setEditTodoPriority(todo.priority);
  setEditTodoDeadline(todo.deadline);
  setEditTodoMemo(todo.memo);
  setIsPopupOpen(true);
};

export const closeEditPopupBase = (
  setIsPopupOpen: (isOpen: boolean) => void
) => {
  setIsPopupOpen(false);
};

export const toggleChrismasModeBase = (
  isChrismas: boolean,
  setChrismas: (isChrismas: boolean) => void
) => {
  setChrismas(!isChrismas);
};
