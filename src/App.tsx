import { useState, useEffect } from "react";
import { initTodos } from "./initTodos";
import TodoList from "./TodoList";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewTodoPopup from "./TodoPopup";
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
  openAddPopupBase,
  closeAddPopupBase,
  openEditPopupBase,
  closeEditPopupBase,
} from "./updateHandlers";
import {
  addNewTodoBase,
  removeCompletedTodosBase,
  removeEachBase,
  editTodoBase,
  sortByPriorityBase,
  sortByDeadlineBase,
} from "./updateTodos";
import { dateFortmat } from "./dateFortmat";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState(INIT_NAME);
  const [newTodoPriority, setNewTodoPriority] = useState(INIT_PRIORITY);
  const [newTodoDeadline, setNewTodoDeadline] = useState(INIT_DEADLINE);
  const [newTodoMemo, setNewTodoMemo] = useState(INIT_MEMO);
  const [editTodoId, setEditTodoId] = useState<TodoId>("");
  const [editTodoName, setEditTodoName] = useState(INIT_NAME);
  const [editTodoPriority, setEditTodoPriority] = useState(INIT_PRIORITY);
  const [editTodoDeadline, setEditTodoDeadline] = useState(INIT_DEADLINE);
  const [editTodoMemo, setEditTodoMemo] = useState(INIT_MEMO);
  const [addIsPopupOpen, setAddIsPopupOpen] = useState(false);
  const [editIsPopupOpen, setEditIsPopupOpen] = useState(false);
  const [chrismasMode, setChrismasMode] = useState(false);

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
  const updateNewPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePriorityBase(e, setNewTodoPriority);
  };
  const updateNewDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeadlineBase(e, setNewTodoDeadline);
  };
  const updateNewIsDone = (id: TodoId, isdone: boolean) => {
    updateIsDoneBase(id, isdone, todos, setTodos);
  };
  const updateNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNameBase(e, setNewTodoName);
  };
  const updateNewMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMemoBase(e, setNewTodoMemo);
  };
  const updateEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNameBase(e, setEditTodoName);
  };
  const updateEditPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePriorityBase(e, setEditTodoPriority);
  };
  const updateEditDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeadlineBase(e, setEditTodoDeadline);
  };
  const updateEditMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMemoBase(e, setEditTodoMemo);
  };
  const openAddPopup = () => {
    openAddPopupBase(setAddIsPopupOpen);
  };
  const closeAddPopup = () => {
    closeAddPopupBase(setAddIsPopupOpen);
  };
  const openEditPopup = (todo: Todo) => {
    openEditPopupBase(
      todo,
      setEditIsPopupOpen,
      setEditTodoId,
      setEditTodoName,
      setEditTodoPriority,
      setEditTodoDeadline,
      setEditTodoMemo
    );
  };
  const closeEditPopup = () => {
    closeEditPopupBase(setEditIsPopupOpen);
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
  const editTodo = () => {
    editTodoBase(
      editTodoId,
      editTodoName,
      editTodoPriority,
      editTodoDeadline,
      editTodoMemo,
      todos,
      setTodos
    );
  };
  const sortByPriority = () => {
    sortByPriorityBase(todos, setTodos);
  };
  const sortByDeadline = () => {
    sortByDeadlineBase(todos, setTodos);
  };

  const toggleChrismasMode = () => {
    setChrismasMode(!chrismasMode);
  };

  const dateFortmatInner = (date: TodoDeadline) => {
    if (chrismasMode) {
      // なんか誤差がやばいので，自前で全部判定や！
      const year = dayjs(date).year();
      const month = dayjs(date).month();
      const day = dayjs(date).date();
      console.log(year, month, day);
      let diffDays = dayjs(`${year}-12-25`).diff(
        dayjs(`${year}-${month + 1}-${day}`),
        "day"
      );
      // console.log(diffDays);
      if (diffDays < 0) {
        diffDays = dayjs(`${year + 1}-12-25`).diff(
          dayjs(`${year}-${month + 1}-${day}`),
          "day"
        );
      }
      // console.log(diffDays);

      return `クリスマス${"イブ".repeat(diffDays)}`;
    }
    return dateFortmat(date);
  };

  return (
    <div className="relative mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-3xl font-bold">TodoApp</h1>
      <button
        onClick={openAddPopup}
        className="absolute right-0 top-0 my-2 flex items-center space-x-2 rounded-md bg-blue-500 px-3 py-1 font-bold text-white hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>新しいタスクの追加</span>
      </button>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={sortByPriority}
          className="rounded-md bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
        >
          優先度でソート
        </button>
        <button
          onClick={sortByDeadline}
          className="rounded-md bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
        >
          期限でソート
        </button>
        <button
          onClick={toggleChrismasMode}
          className="rounded-md bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
        >
          クリスマスモード
        </button>
      </div>

      <TodoList
        todos={todos}
        updateIsDone={updateNewIsDone}
        removeEach={removeEach}
        openEditPopup={openEditPopup}
        dateFormat={dateFortmatInner}
      />
      <button
        type="button"
        onClick={removeCompletedTodos}
        className="mt-2 flex items-center space-x-2 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
      >
        <FontAwesomeIcon icon={faTrash} />
        <span>完了済みタスクを削除</span>
      </button>
      <div className="mb-4"></div>
      {addIsPopupOpen && (
        <NewTodoPopup
          todoName={newTodoName}
          todoPriority={newTodoPriority}
          todoDeadline={newTodoDeadline}
          todoMemo={newTodoMemo}
          updateTodoName={updateNewName}
          updateTodoPriority={updateNewPriority}
          updateTodoDeadline={updateNewDeadline}
          updateTodoMemo={updateNewMemo}
          updateTodo={addNewTodo}
          closePopup={closeAddPopup}
          addOrEdit={"add"}
        />
      )}
      {editIsPopupOpen && (
        <NewTodoPopup
          todoName={editTodoName}
          todoPriority={editTodoPriority}
          todoDeadline={editTodoDeadline}
          todoMemo={editTodoMemo}
          updateTodoName={updateEditName}
          updateTodoPriority={updateEditPriority}
          updateTodoDeadline={updateEditDeadline}
          updateTodoMemo={updateEditMemo}
          updateTodo={editTodo}
          closePopup={closeEditPopup}
          addOrEdit={"edit"}
        />
      )}
    </div>
  );
};

export default App;
