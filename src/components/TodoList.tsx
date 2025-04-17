import { useContext } from 'react';
import { TodoContext } from '../Contexts/TodoContext';
import TodoItem from './TodoItem';

/**
 * props定義
 */
interface TodoListProps {
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
}

/**
 * TodoListコンポーネント：タスク一覧表示
 */
function TodoList({ deleteTodo }: TodoListProps) {
  // Contextから取得
  const context = useContext(TodoContext);
  if (!context) return null;
  const { todos, dispatch } = context;

  /**
   * 完了状態切り替え処理
   */
  const changeCompleted = (id: number) => {
    dispatch({ type: 'CHANGE_COMPLETED', payload: id });
  };

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
