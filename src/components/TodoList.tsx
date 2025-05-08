import TodoItem from './TodoItem';
import { useMemo } from 'react';
import FilterMenu from './FilterMenu';
import { Action, FilterStatus, TodoType } from '../Types/TodoType';
import { List } from '@mui/material';

/**
 * props定義
 */
interface TodoListProps {
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
  tasks: TodoType[]; // 親コンポーネントから渡されたタスクのリスト
  dispatch: React.Dispatch<Action>; // 親コンポーネントから渡された状態更新のための関数
  filter: FilterStatus; // 現在のフィルター状態
  setFilter: React.Dispatch<React.SetStateAction<FilterStatus>>; // フィルター状態を更新する関数
}

/**
 * TodoListコンポーネント：タスク一覧表示
 */
function TodoList({
  deleteTodo,
  tasks,
  dispatch,
  filter,
  setFilter,
}: TodoListProps) {
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
        return tasks.filter((todo) => !todo.completed);
      case 'completed':
        return tasks.filter((todo) => todo.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div>
      {/* フィルターメニュー表示 */}
      <div style={{ marginBottom: '16px' }}>
        <FilterMenu onChange={setFilter} />
      </div>

      <List>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id} // 内部用識別子
            todo={todo}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
    </div>
  );
}

export default TodoList;
