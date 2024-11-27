import { useState, useEffect } from "react";
import { initTodos } from "./initTodos";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewTodoPopup from "./NewTodoPopup";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Todo,
  TodoName,
  TodoId,
  TodoIsDone,
  TodoPriority,
  TodoDeadline,
  TodoMemo,
  INIT_IS_DONE,
  INIT_PRIORITY,
  INIT_DEADLINE,
  INIT_MEMO,
  INIT_NAME,
} from "./types";
import {
  updatePriorityBase,
  updateDeadlineBase,
  updateIsDoneBase,
  updateNameBase,
  updateMemoBase,
  openPopupBase,
  closePopupBase,
} from "./updateHandlers";
import {
  addNewTodoBase,
  removeCompletedTodosBase,
  removeEachBase,
  editTodosBase,
} from "./updateTodos";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState(INIT_NAME);
  const [newTodoPriority, setNewTodoPriority] = useState(INIT_PRIORITY);
  const [newTodoDeadline, setNewTodoDeadline] = useState(INIT_DEADLINE);
  const [newTodoMemo, setNewTodoMemo] = useState(INIT_MEMO);
  const [editTodoName, setEditTodoName] = useState(INIT_NAME);
  const [editTodoPriority, setEditTodoPriority] = useState(INIT_PRIORITY);
  const [editTodoDeadline, setEditTodoDeadline] = useState(INIT_DEADLINE);
  const [editTodoMemo, setEditTodoMemo] = useState(INIT_MEMO);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 初期化処理
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      setTodos(storedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);
  // 初期化処理

  // update系
  const updatePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePriorityBase(e, setNewTodoPriority);
  };
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeadlineBase(e, setNewTodoDeadline);
  };
  const updateIsDone = (id: TodoId, isdone: boolean) => {
    updateIsDoneBase(id, isdone, todos, setTodos);
  };
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNameBase(e, setNewTodoName);
  };
  const updateMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMemoBase(e, setNewTodoMemo);
  };
  const openPopup = () => {
    openPopupBase(setIsPopupOpen);
  };
  const closePopup = () => {
    closePopupBase(setIsPopupOpen);
  };
  const addNewTodo = () => {
    addNewTodoBase(
      todos,
      newTodoName,
      newTodoPriority,
      newTodoDeadline,
      newTodoMemo,
      setTodos,
      setNewTodoName,
      setNewTodoPriority,
      setNewTodoDeadline
    );
  };
  const removeCompletedTodos = () => {
    removeCompletedTodosBase(todos, setTodos);
  };
  const removeEach = (id: TodoId) => {
    removeEachBase(id, todos, setTodos);
  };
  const editTodos = (id: TodoId) => {
    editTodosBase(
      id,
      editTodoName,
      editTodoPriority,
      editTodoDeadline,
      editTodoMemo,
      todos,
      setTodos
    );
  };

  return (
    <div className="relative mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-3xl font-bold">TodoApp</h1>
      <button
        onClick={openPopup}
        className="absolute right-0 top-0 my-2 flex items-center space-x-2 rounded-md bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>新しいタスクの追加</span>
      </button>
      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        removeEach={removeEach}
      />
      <button
        type="button"
        onClick={removeCompletedTodos}
        className="mt-2 flex items-center space-x-2 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
      >
        <FontAwesomeIcon icon={faTrash} />
        <span>完了済みタスクを削除</span>
      </button>
      {isPopupOpen && (
        <NewTodoPopup
          newTodoName={newTodoName}
          newTodoPriority={newTodoPriority}
          newTodoDeadline={newTodoDeadline}
          newTodoMemo={newTodoMemo}
          updateNewTodoName={updateName}
          updateNewTodoPriority={updatePriority}
          updateNewTodoDeadline={updateDeadline}
          updateNewTodoMemo={updateMemo}
          addNewTodo={addNewTodo}
          closePopup={closePopup}
        />
      )}
    </div>
  );
};

export default App;
