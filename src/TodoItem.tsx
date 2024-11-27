import React from "react";
import {
  Todo,
  TodoId,
  TodoIsDone,
  TodoDeadline,
  TodoPriority,
  TodoName,
  TodoMemo,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
// import { dateFortmat } from "./dateFortmat";
import { pt } from "date-fns/locale";

type Props = {
  todo: Todo;
  updateIsDone: (id: TodoId, isDone: TodoIsDone) => void;
  removeEach: (id: TodoId) => void;
  openEditPopup: (todo: Todo) => void;
  dateFormat: (date: Date) => string;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  // 優先度の星を生成する関数
  const renderStars = (priority: number) => {
    return Array.from({ length: priority }, (_, index) => (
      <FontAwesomeIcon key={index} icon={faStar} style={{ color: "#FFAF00" }} />
    ));
  };

  // 日付を受け取って現在時刻と比較し、過去か未来かを判断する関数
  const isPastDeadline = (deadline: Date) => {
    return dayjs(deadline).isBefore(dayjs());
  };

  return (
    <div className="group flex w-full flex-row items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-3 size-5 cursor-pointer accent-blue-500"
          />
          <span
            className={`break-all text-xl ${todo.isDone ? "text-gray-400 line-through" : "text-gray-800"} w-full pr-2 text-justify group-hover:font-bold`}
          >
            {todo.name}
          </span>
        </div>
        {todo.memo && (
          <div className="ml-8 mt-1 break-all pr-2 text-justify text-lg text-gray-500">
            メモ: {todo.memo}
          </div>
        )}
        <div className="ml-8 mt-1 text-lg text-gray-500">
          優先度: {renderStars(todo.priority)}
        </div>
        {todo.deadline && (
          <div
            className={`ml-8 mt-1 text-lg ${
              !todo.isDone && isPastDeadline(todo.deadline)
                ? "font-bold text-red-500"
                : "text-gray-500"
            }`}
          >
            期限: {props.dateFormat(todo.deadline)}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => {
            props.removeEach(todo.id);
          }}
          className="mb-2 shrink-0 rounded-full bg-red-500 px-4 py-2 text-lg font-bold text-white transition-colors duration-300 hover:bg-red-700"
          style={{ minWidth: "70px" }}
        >
          削除
        </button>
        <button
          onClick={() => {
            props.openEditPopup(todo);
          }}
          className="shrink-0 rounded-full bg-blue-500 px-4 py-2 text-lg font-bold text-white transition-colors duration-300 hover:bg-blue-700"
          style={{ minWidth: "70px" }}
        >
          編集
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
