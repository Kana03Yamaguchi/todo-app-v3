/**
 * props定義
 */
interface TodoFormProps {
  input: string; // 入力内容
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // タスク内容変更時用関数
  onAdd: () => void; // 追加ボタン押下時用関数
}

/**
 * TodoFormコンポーネント：入力欄と追加ボタンを表示
 */
function TodoForm({ input, onChange, onAdd }: TodoFormProps) {
  return (
    <div className="todo-form">
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="タスクを入力"
      />
      <button onClick={onAdd}>追加</button>
    </div>
  );
}

export default TodoForm;
