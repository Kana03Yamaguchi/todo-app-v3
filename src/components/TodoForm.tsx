import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { TodoType } from '../Types/TodoType';
import { useTodos } from '../Hooks/useTodos';

/**
 * TodoFormコンポーネント：入力欄と追加ボタンを表示
 */
function TodoForm() {
  // 入力欄の文字を管理
  const [input, setInput] = useState('');
  // エラーメッセージ表示を管理
  const [errorMsg, setErrorMsg] = useState('');

  // useTodosからContextを取得
  const { dispatch } = useTodos();

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
    if (input.trim() === '') {
      setErrorMsg('タスクを入力してください');
      return;
    }

    // 新規タスク追加用のオブジェクト作成
    const newTodo: TodoType = {
      id: Date.now(), // タスクID（現在時刻）
      text: input, // タスク内容（入力された内容）
      completed: false, // 完了状態（未完了）
    };
    // タスクを追加する
    dispatch({ type: 'ADD', payload: newTodo });

    // 入力欄を空にリセット
    setInput('');
    // エラーメッセージを空にリセット
    setErrorMsg('');
  };

  return (
    <div>
      <div className="todo-form">
        {/* 入力欄表示 */}
        <input
          type="text"
          value={input}
          onChange={inputChange}
          placeholder="タスクを入力"
        />

        {/* 追加ボタン表示 */}
        <button onClick={addTodo}>
          <FaPlus />
        </button>
      </div>

      {/* 入力エラーメッセージ表示 */}
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
}

export default TodoForm;
