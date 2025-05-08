import { useEffect, useReducer, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { FilterStatus, MenuType, TodoType } from './Types/TodoType';
import { FaChevronUp, FaChevronDown, FaTrash } from 'react-icons/fa';
import { todoReducer } from './Reducers/todoReducer';
import { TodoContext } from './Contexts/TodoContext';
import { deletedToggleButtonStyle } from './styles/muiStyles';
import { Box, Button } from '@mui/material';
import NavMenu from './components/NavMenu';

function App() {
  // タスクの一覧を管理
  const [todos, dispatch] = useReducer(todoReducer, []);
  // 削除済みタスクを管理
  const [deletedTodos, setDeletedTodos] = useState<TodoType[]>([]);
  // 未完了のタスク数
  const remaining = todos.filter((todo) => !todo.completed).length;
  // アコーディオン開閉を管理
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // ナビメニューの選択状態を管理
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('today');
  // フィルターの状態を管理
  const [filter, setFilter] = useState<FilterStatus>('active');

  /**
   * ナビメニューの選択に応じて表示するタスクを切り替える処理
   * @returns {TodoType[]} 表示するタスクの配列
   */
  const getVisibleTasks = (): TodoType[] => {
    switch (selectedMenu) {
      case 'today':
        // 今日の日付のタスクだけ返す
        return filterTodayTasks();
      case 'active':
        // 未完了のタスクだけ返す
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        // 完了済みのタスクだけ返す
        return todos.filter((todo) => todo.completed);
      case 'all':
      default:
        // 全てのタスクを返す
        return todos;
    }
  };

  /**
   * 今日のタスクをフィルタリングする処理
   * @returns {TodoType[]} 今日のタスクの配列
   */
  const filterTodayTasks = () => {
    // 今日の日付を取得（yyyy-mm-dd形式）
    const today = new Date().toISOString().split('T')[0];
    // タスク期日が今日の日付に一致するタスクをフィルタリング
    return todos.filter((todo) => todo.dueDate?.split('T')[0] === today);
  };

  /**
   * タスク削除ボタン処理
   */
  const deleteTodo = (id: number) => {
    // 削除対象のタスクを取得
    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;
    // 削除済みタスクとして追加
    setDeletedTodos([...deletedTodos, targetTodo]);

    // タスクを削除する
    dispatch({ type: 'DELETE', payload: id });
  };

  // 削除済みタスクの一覧表示処理
  const deletedTodosList = () => {
    if (deletedTodos.length === 0) {
      return <li>削除されたタスクはありません</li>;
    }

    return deletedTodos.map((todo) => <li key={todo.id}>{todo.text}</li>);
  };

  /**
   * 初期表示処理
   */
  useEffect(() => {
    // 前回保存データをlocalStorageから取得
    const stored = localStorage.getItem('todos');

    if (stored) {
      // 保存データが存在する場合
      try {
        // JSON変換：文字列から配列に変換
        const parsed = JSON.parse(stored) as TodoType[];
        // 保存データをタスクに追加する
        parsed.forEach((todo) => {
          dispatch({ type: 'ADD', payload: todo });
        });
      } catch (error) {
        // JSON変換：失敗した場合
        console.error('データの読み込みに失敗しました', error);
      }
    }
  }, []);

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
      {/* 左カラム：ナビメニュー */}
      <NavMenu
        selectedMenu={selectedMenu}
        onSelect={setSelectedMenu}
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
        filter={filter}
        setFilter={setFilter}
      />
      {/* <Box
        flex={{ xs: 1, md: 4 }}
        sx={{ backgroundColor: '#f0f0f0', padding: 2, borderRadius: 2 }}
      > */}
      {/* タスク期日が「今日」に該当するタスクを表示するボタン */}
      {/* <Button onClick={() => setShowTodayTasks(!showTodayTasks)}>
          {showTodayTasks ? '全てのタスク' : '今日のタスク'}
        </Button> */}

      {/* 削除済みタスクを表示するボタン */}
      {/* <Button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          sx={deletedToggleButtonStyle}
          variant="contained"
        >
          {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />} <FaTrash />
        </Button>
      </Box> */}

      {/* 右カラム：タスク一覧 */}
      <Box flex={{ xs: 1, md: 8 }} sx={{ padding: 2, overflow: 'auto' }}>
        <TodoContext.Provider value={{ todos, dispatch }}>
          <div className="container">
            <h1>TODO</h1>
            {/* タスク追加エリア */}
            <TodoForm />

            {/* タスク件数エリア */}
            <div className="task-info">
              <span>アクティブタスク： {remaining} 件</span>
            </div>

            {/* タスク一覧エリア */}
            <TodoList
              deleteTodo={deleteTodo}
              tasks={getVisibleTasks()}
              dispatch={dispatch}
              filter={filter}
              setFilter={setFilter}
            />

            {/* 削除済みタスクエリア */}
            <div>
              {isAccordionOpen && (
                <ul className="deleted-todo-list">{deletedTodosList()}</ul>
              )}
            </div>
          </div>
        </TodoContext.Provider>
      </Box>
    </Box>
  );
}

export default App;
