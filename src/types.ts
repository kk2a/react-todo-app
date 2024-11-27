import dayjs from "dayjs";

export type TodoId = string;
export type TodoName = string;
export type TodoIsDone = boolean;
export type TodoPriority = number;
export type TodoDeadline = Date;
export type TodoMemo = string;

export type Todo = {
  id: TodoId;
  name: TodoName;
  isDone: TodoIsDone;
  priority: TodoPriority;
  deadline: TodoDeadline;
  memo?: TodoMemo;
};

export const INIT_NAME: TodoName = "";
export const INIT_IS_DONE: TodoIsDone = false;
export const INIT_PRIORITY: TodoPriority = 3;
export const INIT_DEADLINE: TodoDeadline = dayjs().startOf("day").toDate();
export const INIT_MEMO: TodoMemo = "";
