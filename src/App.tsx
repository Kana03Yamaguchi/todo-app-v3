import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { FilterStatus, MenuType, TodoType } from './Types/TodoType';
import { todoReducer } from './Reducers/todoReducer';
import { TodoContext } from './Contexts/TodoContext';
import {
  Box,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import NavMenu from './components/NavMenu';
import FilterMenu from './components/FilterMenu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function App() {
  // タスクの一覧を管理
  const [todos, dispatch] = useReducer(todoReducer, []);
  // 現在のテーマモードを管理（light or dark）
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  // ライトテーマの定義
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  // ダークテーマの定義
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  // ナビメニューの選択状態を管理
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('today');
  // フィルターの状態を管理（未完了・完了・すべて）
  const [filter, setFilter] = useState<FilterStatus>('active');
  // 直近で追加されたタスクのIDを管理
  const [newTodoId, setNewTodoId] = useState<number | null>(null);
  // 削除済みタスクを管理
  const [deletedTodos, setDeletedTodos] = useState<TodoType[]>([]);
  // 未完了のタスク数
  const remaining = todos.filter((todo) => !todo.completed).length;

  /**
   * テーマモード切り替え処理
   */
  const toggleThemeMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  /**
   * 今日のタスクだけを取得する関数
   * @returns {TodoType[]} 今日のタスクの配列
   */
  const filterTodayTasks = useCallback((list: TodoType[]) => {
    // 今日の日付を取得（yyyy-mm-dd形式）
    const today = new Date().toISOString().split('T')[0];
    // タスク期日が今日の日付に一致するタスクをフィルタリング
    return list.filter((todo) => todo.dueDate?.split('T')[0] === today);
  }, []);

  /**
   * 選択されたメニューとフィルター状態に基づいて表示するタスクを計算
   */
  const visibleTasks = useMemo(() => {
    // すべてのタスクを一旦コピー
    let filtered = [...todos];

    // 「今日のタスク」メニューが選ばれている場合は今日のタスクに絞る
    if (selectedMenu === 'today') {
      filtered = filterTodayTasks(filtered);
    }
    // フィルターが「未完了」の場合は完了していないタスクに絞る
    if (filter === 'active') {
      filtered = filtered.filter((todo) => !todo.completed);
    }
    // フィルターが「完了済み」の場合は完了したタスクに絞る
    else if (filter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    }

    // 最終的な表示対象のタスクを返す
    return filtered;
  }, [todos, selectedMenu, filter, filterTodayTasks]);

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
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      {/* 上部：右上のテーマ切り替え */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
        <IconButton onClick={toggleThemeMode}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Typography variant="body2" ml={1}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Typography>
      </Box>

      {/* メインレイアウト（左カラム＋右カラム） */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
        {/* 左カラム：ナビメニュー */}
        <NavMenu
          selectedMenu={selectedMenu}
          onSelect={setSelectedMenu}
          filter={filter}
          setFilter={setFilter}
        />

        {/* 右カラム：タスク一覧 */}
        <Box flex={{ xs: 1, md: 8 }} sx={{ padding: 2, overflow: 'auto' }}>
          <TodoContext.Provider value={{ todos, dispatch }}>
            <div className="container">
              <h1>TODO</h1>
              {/* タスク追加エリア */}
              <TodoForm
                setSelectedMenu={setSelectedMenu}
                setFilter={setFilter}
                setNewTodoId={setNewTodoId}
              />

              {/* タスク件数エリア */}
              <div className="task-info">
                <span>アクティブタスク： {remaining} 件</span>
              </div>

              {/* フィルターメニュー表示 */}
              {(selectedMenu === 'today' || selectedMenu === 'all') && (
                <div style={{ marginBottom: '16px' }}>
                  <FilterMenu onChange={setFilter} />
                </div>
              )}

              {/* タスク一覧エリア */}
              <TodoList
                deleteTodo={deleteTodo}
                tasks={visibleTasks}
                dispatch={dispatch}
                newTodoId={newTodoId}
              />

              {/* 削除済みタスクエリア */}
              <div>
                {selectedMenu === 'deleted' && (
                  <ul className="deleted-todo-list">{deletedTodosList()}</ul>
                )}
              </div>
            </div>
          </TodoContext.Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
