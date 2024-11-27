import React from "react";
import { Todo } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, isDone: boolean) => void;
  removeEach: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  // 優先度の星を生成する関数
  const renderStars = (priority: number) => {
    return Array.from({ length: priority }, (_, index) => (
      <FontAwesomeIcon key={index} icon={faStar} style={{ color: "#FFAF00" }} />
    ));
  };

  // 期限をフォーマットする関数
  const formatDeadline = (deadline: Date | null) => {
    return deadline ? dayjs(deadline).format("YYYY/MM/DD HH:mm") : "";
  };

  // 日付を受け取って現在時刻と比較し、過去か未来かを判断する関数
  const isPastDeadline = (deadline: Date | null) => {
    if (!deadline) return false;
    return dayjs(deadline).isBefore(dayjs());
  };

  return (
    <div className="group flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-3 size-5 cursor-pointer accent-blue-500"
          />
          <span
            className={`text-lg ${todo.isDone ? "text-gray-400 line-through" : "text-gray-800"} group-hover:font-bold`}
          >
            {todo.name}
          </span>
        </div>
        <div className="ml-8 mt-1 text-sm text-gray-500">
          優先度: {renderStars(todo.priority)}
        </div>
        {todo.deadline && (
          <div
            className={`ml-8 mt-1 text-sm ${
              !todo.isDone && isPastDeadline(todo.deadline)
                ? "font-bold text-red-500"
                : "text-gray-500"
            }`}
          >
            期限: {formatDeadline(todo.deadline)}
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => props.removeEach(todo.id)}
          className="w-16 shrink-0 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white transition-colors duration-300 hover:bg-red-700"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
