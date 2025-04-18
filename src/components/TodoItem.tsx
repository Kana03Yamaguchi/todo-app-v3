import {
  FaCheckCircle,
  FaEdit,
  FaRegCircle,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import { TodoType } from '../Types/TodoType';
import { useState } from 'react';
import { useTodos } from '../Hooks/useTodos';

/**
 * props定義
 */
interface TodoItemProps {
  todo: TodoType; // タスクデータ
  changeCompleted: (id: number) => void; // 完了状態切り替え用関数
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
}

/**
 * TodoItemコンポーネント：タスク項目を表示（完了状態、タスク内容 、 削除ボタン）
 */
function TodoItem({ todo, changeCompleted, deleteTodo }: TodoItemProps) {
  // 編集状態を管理（false:編集OFF/true:編集ON）
  const [isEditing, setIsEditing] = useState(false);
  // 入力欄の文字を管理（編集用）
  const [editInput, setEditInput] = useState(todo.text);
  // エラーメッセージ表示を管理
  const [errorMsg, setErrorMsg] = useState('');
  // useTodosからContextを取得
  const { dispatch } = useTodos();

  /**
   * タスク編集ボタン処理
   */
  const startEdit = () => {
    // 入力欄に初期値をセット
    setEditInput(todo.text);
    // 編集ONに切り替え
    setIsEditing(true);
  };

  /**
   * 入力内容変更処理（編集用）
   */
  const editInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力された文字を保持
    setEditInput(e.target.value);
  };

  /**
   * タスク保存ボタン処理
   */
  const saveTodo = () => {
    // 入力欄が空白の場合はTODO保存しない
    if (editInput.trim() === '') {
      setErrorMsg('タスクを入力してください');
      return;
    }

    // タスクを保存する
    dispatch({ type: 'EDIT', payload: { id: todo.id, text: editInput } });

    // 編集OFFに切り替え
    setIsEditing(false);

    // エラーメッセージを空にリセット
    setErrorMsg('');
  };

  return (
    <li className="todo-item">
      <div className="left-section">
        {/* チェックボックス表示 */}
        <span
          className="check-icon"
          // チェックされたタスクのIDを渡して関数を呼び出す
          onClick={changeCompleted.bind(null, todo.id)}
          style={{ cursor: 'pointer' }}
        >
          {todo.completed ? (
            <FaCheckCircle color="#65b7d8" />
          ) : (
            <FaRegCircle color="#888" />
          )}
        </span>

        {isEditing ? (
          <div className="todo-edit-form">
            {/* 入力欄表示（編集用） */}
            <input type="text" value={editInput} onChange={editInputChange} />

            {/* 保存ボタン表示 */}
            <button onClick={saveTodo}>
              <FaSave />
            </button>

            {/* 入力エラーメッセージ表示 */}
            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </div>
        ) : (
          <>
            {/* タスク内容表示 */}
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
          </>
        )}
      </div>

      <div className="right-section">
        {/* 編集ボタン表示 */}
        <button className="edit-button" onClick={startEdit}>
          <FaEdit />
        </button>

        {/* 削除ボタン表示 */}
        <button
          className="delete-button"
          onClick={deleteTodo.bind(null, todo.id)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
