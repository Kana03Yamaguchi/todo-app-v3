import { TodoType } from "../Types/TodoType";

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
  return (
    <li className="todo-item">
      {/* チェックボックス表示 */}
      <input
        type="checkbox"
        checked={todo.completed}
        // チェックされたタスクのIDを渡して関数を呼び出す
        onChange={changeCompleted.bind(null, todo.id)}
      />

      {/* タスク内容表示 */}
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>

      {/* 削除ボタン表示 */}
      <button onClick={deleteTodo.bind(null, todo.id)}>削除</button>
    </li>
  );
}

export default TodoItem;
