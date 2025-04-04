import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";
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
      <div className="left-section">
        {/* チェックボックス表示 */}
        <span
          className="check-icon"
          // チェックされたタスクのIDを渡して関数を呼び出す
          onClick={changeCompleted.bind(null, todo.id)}
          style={{ cursor: "pointer" }}
        >
          {todo.completed ? (
            <FaCheckCircle color="#65b7d8" />
          ) : (
            <FaRegCircle color="#888" />
          )}
        </span>

        {/* タスク内容表示 */}
        <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      </div>

      {/* 削除ボタン表示 */}
      <button
        className="delete-button"
        onClick={deleteTodo.bind(null, todo.id)}
      >
        <FaTrash />
      </button>
    </li>
  );
}

export default TodoItem;
