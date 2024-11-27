import { useState, useEffect } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import NewTodoPopup from "./NewTodoPopup";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date>(
    dayjs().startOf("day").toDate()
  );
  // const [newTodoNameError, setNewTodoNameError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";
  // const clearLocalStorage = () => {
  //   localStorage.removeItem(localStorageKey);
  //   setTodos(initTodos);
  // };
  // clearLocalStorage();

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
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

  const updatePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priority = Number(e.target.value);
    setNewTodoPriority(Math.max(0, Math.min(1000, priority)));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setNewTodoDeadline(dayjs().startOf("day").toDate());
      return;
    }
    setNewTodoDeadline(new Date(e.target.value));
  };

  const updateIsDone = (id: string, isdone: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: isdone };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const addNewTodo = () => {
    if (newTodoName.length < 1) {
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    setTodos([...todos, newTodo]);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(dayjs().startOf("day").toDate());
    closePopup();
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const removeEach = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
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
          updateNewTodoName={updateNewTodoName}
          updateNewTodoPriority={updatePriority}
          updateNewTodoDeadline={updateDeadline}
          addNewTodo={addNewTodo}
          closePopup={closePopup}
        />
      )}
    </div>
  );
};

export default App;
