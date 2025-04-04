import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoType } from "./Types/TodoType";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function App() {
  // タスクの一覧を管理
  const [todos, setTodos] = useState<TodoType[]>([]);
  // 入力欄の文字を管理
  const [input, setInput] = useState("");
  // エラーメッセージ表示を管理
  const [errorMsg, setErrorMsg] = useState("");
  // 削除済みタスクを管理
  const [deletedTodos, setDeletedTodos] = useState<TodoType[]>([]);
  // アコーディオン開閉を管理
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // 未完了のタスク数
  const remaining = todos.filter((todo) => !todo.completed).length;

  /**
   * 入力内容変更処理
   */
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力された文字を保持
    setInput(e.target.value);
  };

  /**
   * タスク追加ボタン処理
   */
  const addTodo = () => {
    // 入力欄が空白の場合はTODO追加しない
    if (input.trim() === "") {
      setErrorMsg("タスクを入力してください");
      return;
    }

    // 新規タスク追加用のオブジェクト作成
    const newTodo: TodoType = {
      id: Date.now(), // タスクID（現在時刻）
      text: input, // タスク内容（入力された内容）
      completed: false, // 完了状態（未完了）
    };

    // タスクを追加
    setTodos([...todos, newTodo]);
    // 入力欄を空にリセット
    setInput("");
    // エラーメッセージを空にリセット
    setErrorMsg("");
  };

  /**
   * 完了状態切り替え処理
   */
  const changeCompleted = (id: number) => {
    const updated = todos.map((todo) =>
      // IDが一致した場合はcompleted を true/false に切り替え、一致しない場合はそのまま
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  /**
   * タスク削除ボタン処理
   */
  const deleteTodo = (id: number) => {
    // 削除対象のタスクを取得
    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;
    // 削除済みタスクとして追加
    setDeletedTodos([...deletedTodos, targetTodo]);

    // IDが一致した場合は除外し、一致しないIDだけを残す
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
  };

  // 削除済みタスクの一覧表示処理
  const deletedTodosList = () => {
    if (deletedTodos.length === 0) {
      return <li>削除されたタスクはありません</li>;
    }

    return deletedTodos.map((todo) => <li key={todo.id}>{todo.text}</li>);
  };

  /**
   * 初期表示処理
   */
  useEffect(() => {
    // 前回保存データをlocalStorageから取得
    const stored = localStorage.getItem("todos");

    if (stored) {
      // 保存データが存在する場合
      try {
        // JSON変換：文字列から配列に変換
        const parsed = JSON.parse(stored) as TodoType[];
        setTodos(parsed);
      } catch (error) {
        // JSON変換：失敗した場合
        console.error("データの読み込みに失敗しました", error);
        setTodos([]);
      }
    } else {
      // 保存データが存在しない場合は空で初期化
      setTodos([]);
    }
  }, []);

  return (
    <div className="container">
      <h1>TODO</h1>
      {/* タスク追加エリア */}
      <TodoForm
        input={input}
        onChange={inputChange}
        onAdd={addTodo}
        errorMsg={errorMsg}
      />

      {/* タスク件数エリア */}
      <div className="task-info">
        <span>アクティブタスク： {remaining} 件</span>
      </div>

      {/* タスク一覧エリア */}
      <TodoList
        todos={todos}
        changeCompleted={changeCompleted}
        deleteTodo={deleteTodo}
      />

      {/* 削除済みタスクエリア */}
      <div className="accordion-section">
        <button
          className="accordion-toggle"
          onClick={setIsAccordionOpen.bind(null, !isAccordionOpen)}
        >
          {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />} 削除済
        </button>

        {isAccordionOpen && (
          <ul className="deleted-todo-list">{deletedTodosList()}</ul>
        )}
      </div>
    </div>
  );
}

export default App;
