import { FaPlus } from "react-icons/fa";

/**
 * props定義
 */
interface TodoFormProps {
  input: string; // 入力内容
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // タスク内容変更時用関数
  onAdd: () => void; // 追加ボタン押下時用関数
  errorMsg: string; // 入力エラーメッセージ表示
}

/**
 * TodoFormコンポーネント：入力欄と追加ボタンを表示
 */
function TodoForm({ input, onChange, onAdd, errorMsg }: TodoFormProps) {
  return (
    <div>
      <div className="todo-form">
        {/* 入力欄表示 */}
        <input
          type="text"
          value={input}
          onChange={onChange}
          placeholder="タスクを入力"
        />

        {/* 追加ボタン表示 */}
        <button onClick={onAdd}>
          <FaPlus />
        </button>
      </div>

      {/* 入力エラーメッセージ表示 */}
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
}

export default TodoForm;
