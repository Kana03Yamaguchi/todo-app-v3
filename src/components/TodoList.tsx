import { TodoType } from "../Types/TodoType";
import TodoItem from "./TodoItem";

/**
 * props定義
 */
interface TodoListProps {
  todos: TodoType[]; // タスクデータ
  changeCompleted: (id: number) => void; // 完了状態切り替え用関数
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
}

/**
 * TodoListコンポーネント：タスク一覧表示
 */
function TodoList({ todos, changeCompleted, deleteTodo }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // 内部用識別子
          todo={todo}
          changeCompleted={changeCompleted}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
