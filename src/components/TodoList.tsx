import TodoItem from './TodoItem';
import { useTodos } from '../Hooks/useTodos';
import { useMemo, useState } from 'react';
import FilterMenu from './FilterMenu';

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
  // useTodosからContextを取得
  const { todos, dispatch } = useTodos();
  // フィルターの状態を管理
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>(
    'active',
  );

  /**
   * 完了状態切り替え処理
   */
  const changeCompleted = (id: number) => {
    dispatch({ type: 'CHANGE_COMPLETED', payload: id });
  };

  // 表示対象のタスクをメモ化（フィルター変更時のみ再計算）
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      {/* フィルターメニュー表示 */}
      <div style={{ marginBottom: '16px' }}>
        <FilterMenu onChange={setFilter} />
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id} // 内部用識別子
            todo={todo}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
