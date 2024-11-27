import React from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { TodoName, TodoPriority, TodoDeadline, TodoMemo } from "./types";
import { dateFortmat } from "./dateFortmat";
import dayjs from "dayjs";
import { formatDate } from "date-fns";

type Props = {
  todoName: TodoName;
  todoPriority: TodoPriority;
  todoDeadline: TodoDeadline;
  todoMemo: TodoMemo;
  updateTodoName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTodoPriority: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTodoDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTodoMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  updateTodo: () => void;
  closePopup: () => void;
  addOrEdit: "add" | "edit";
};

const NewTodoPopup: React.FC<Props> = ({
  todoName: todoName,
  todoPriority: todoPriority,
  todoDeadline: todoDeadline,
  todoMemo: todoMemo,
  updateTodoName: updateTodoName,
  updateTodoPriority: updateTodoPriority,
  updateTodoDeadline: updateTodoDeadline,
  updateTodoMemo: updateTodoMemo,
  updateTodo: updateTodo,
  closePopup: closePopup,
  addOrEdit: addOrEdit,
}) => {
  const isNameInvalid = todoName.length < 1;
  const format = (date: Date) => {
    return dayjs(date).format("YYYY-MM-DDTHH:mm");
  };
  // const displayDeadline = dateFortmat(newTodoDeadline);
  // console.log(displayDeadline);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="rounded-md bg-white p-6 shadow-md">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={todoName}
              onChange={updateTodoName}
              className={twMerge(
                "grow rounded-md border p-2",
                isNameInvalid && "border-red-500 outline-red-500"
              )}
              placeholder="1文字以上入力してください"
            />
          </div>
          {isNameInvalid && (
            <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>1文字以上入力してください</div>
            </div>
          )}
          <div className="mt-4 flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoPriority">
              優先度
            </label>
            <input
              id="newTodoPriority"
              type="number"
              value={todoPriority}
              onChange={updateTodoPriority}
              className="grow rounded-md border p-2"
              min={0}
              max={1000}
            />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoDeadline">
              期限
            </label>
            <input
              type="datetime-local"
              id="newTodoDeadline"
              value={format(todoDeadline)}
              onChange={updateTodoDeadline}
              className="rounded-md border border-gray-400 px-2 py-0.5 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoMemo">
              メモ
            </label>
            <textarea
              id="newTodoMemo"
              value={todoMemo}
              onChange={updateTodoMemo}
              className="grow rounded-md border p-2"
              placeholder="メモを入力してください"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={closePopup}
              className="rounded-md bg-gray-500 px-3 py-1 font-bold text-white hover:bg-gray-600"
            >
              キャンセル
            </button>
            <button
              onClick={() => {
                updateTodo();
                closePopup();
              }}
              className={twMerge(
                "rounded-md px-3 py-1 font-bold text-white",
                isNameInvalid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              )}
              disabled={isNameInvalid}
            >
              {addOrEdit === "add" ? "追加" : "編集"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTodoPopup;
