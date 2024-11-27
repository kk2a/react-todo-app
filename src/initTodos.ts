import { Todo, INIT_DEADLINE } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "解析2の宿題",
    isDone: false,
    priority: 2,
    deadline: new Date(),
    memo: "微分積分学の復習",
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: true,
    priority: 3,
    deadline: INIT_DEADLINE,
    memo: "",
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 100,
    deadline: new Date(2024, 10, 11),
    memo: "リードアルファ",
  },
];
