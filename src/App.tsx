import { useState } from "react";
import "./App.css";

/**
 * 型定義：TODO
 */
interface Todo {
  id: number; // タスクID
  text: string; // タスク内容
  completed: boolean; // 完了状態
}

function App() {
  // タスクの一覧を状態として管理
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力欄の文字を管理する状態
  const [input, setInput] = useState("");

  /**
   * 入力欄に文字が入力されたときの処理
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
    if (input.trim() === "") return;

    // 新規タスク追加用のオブジェクト作成
    const newTodo: Todo = {
      id: Date.now(), // タスクID（現在時刻）
      text: input, // タスク内容（入力された内容）
      completed: false, // 完了状態（未完了）
    };

    // タスクを追加
    setTodos([...todos, newTodo]);
    // 入力欄を空にリセット
    setInput("");
  };

  /**
   * チェックボックス処理
   */
  const changeCheckBox = (id: number) => {
    const updated = todos.map((todo) =>
      // IDが一致した場合はcompleted を true/false に切り替え、一致しない場合はそのまま
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  /**
   * タスク一覧表示処理
   */
  const todoList = () => {
    return todos.map((todo) => {
      return (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            // チェックされたタスクのIDを渡して関数を呼び出す
            onChange={changeCheckBox.bind(null, todo.id)}
          />
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
        </li>
      );
    });
  };

  return (
    <div className="container">
      <h1>TODOアプリ</h1>

      {/* タスク追加エリア */}
      <div className="add-todo">
        <input
          type="text"
          value={input}
          onChange={inputChange}
          placeholder="タスクを入力"
        />
        <button onClick={addTodo}>追加</button>
      </div>

      {/* タスク一覧エリア */}
      <ul>{todoList()}</ul>
    </div>
  );
}

export default App;
