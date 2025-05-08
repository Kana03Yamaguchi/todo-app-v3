import TodoItem from './TodoItem';
import { Action, TodoType } from '../Types/TodoType';
import { Collapse, List } from '@mui/material';

/**
 * props定義
 */
interface TodoListProps {
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
  tasks: TodoType[]; // 親コンポーネントから渡されたタスクのリスト
  dispatch: React.Dispatch<Action>; // 親コンポーネントから渡された状態更新のための関数
  newTodoId: number | null; // 直近追加タスクID
}

/**
 * TodoListコンポーネント：タスク一覧表示
 */
function TodoList({ deleteTodo, tasks, dispatch, newTodoId }: TodoListProps) {
  /**
   * 完了状態切り替え処理
   */
  const changeCompleted = (id: number) => {
    dispatch({ type: 'CHANGE_COMPLETED', payload: id });
  };

  return (
    <div>
      <List>
        {tasks.map((todo) => (
           <Collapse
           key={todo.id}
           in={true}
           timeout={todo.id === newTodoId ? 500 : 0}
         >
            <TodoItem
              key={todo.id}
              todo={todo}
              changeCompleted={changeCompleted}
              deleteTodo={deleteTodo}
            />
          </Collapse>
        ))}
      </List>
    </div>
  );
}

export default TodoList;
