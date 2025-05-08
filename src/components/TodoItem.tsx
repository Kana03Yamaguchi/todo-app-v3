import {
  FaCheckCircle,
  FaEdit,
  FaRegCircle,
  FaSave,
  FaTrash,
  FaUndoAlt,
} from 'react-icons/fa';
import { TodoType } from '../Types/TodoType';
import { useState } from 'react';
import { useTodos } from '../Hooks/useTodos';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  iconButtonCancelStyle,
  iconButtonDeleteStyle,
  iconButtonEditStyle,
  iconButtonSaveStyle,
  inputFieldBase,
  listItemContainer,
} from '../styles/muiStyles';

/**
 * props定義
 */
interface TodoItemProps {
  todo: TodoType; // タスクデータ
  changeCompleted: (id: number) => void; // 完了状態切り替え用関数
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
}

/**
 * TodoItemコンポーネント：タスク項目を表示（完了状態、タスク内容 、削除ボタン）
 */
function TodoItem({ todo, changeCompleted, deleteTodo }: TodoItemProps) {
  // 編集状態を管理（false:編集OFF/true:編集ON）
  const [isEditing, setIsEditing] = useState(false);
  // 入力欄の内容を管理（編集用）
  const [editInput, setEditInput] = useState(todo.text);
  // 期日の内容を管理（編集用）
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  // エラーメッセージ表示を管理
  const [errorMsg, setErrorMsg] = useState('');
  // useTodosからContextを取得
  const { dispatch } = useTodos();

  // 年月日表示フォーマット
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  /**
   * タスク編集ボタン処理
   */
  const startEdit = () => {
    // 入力欄に初期値をセット
    setEditInput(todo.text);
    // 期日に初期値をセット
    setEditDueDate(todo.dueDate ? todo.dueDate : '');
    // 編集ONに切り替え
    setIsEditing(true);
  };

  /**
   * タスク編集キャンセルボタン処理
   */
  const cancelEdit = () => {
    // 編集OFFに切り替え
    setIsEditing(false);
    // 入力欄に初期値をセット
    setEditInput(todo.text);
    // 期日に初期値をセット
    setEditDueDate(todo.dueDate ? todo.dueDate : '');
    // エラーメッセージを空にリセット
    setErrorMsg('');
  };

  /**
   * 入力内容変更処理（編集用）
   */
  const editInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力された文字を保持
    setEditInput(e.target.value);
  };

  /**
   * 期日内容変更処理（編集用）
   */
  const editDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 選択した年月日を保持
    setEditDueDate(e.target.value);
  };

  /**
   * タスク保存ボタン処理
   */
  const saveTodo = () => {
    // 入力欄が空白の場合はTODO保存しない
    if (editInput.trim() === '') {
      setErrorMsg('タスクを入力してください');
      return;
    }

    // タスクを保存する
    dispatch({
      type: 'EDIT',
      payload: { id: todo.id, text: editInput, dueDate: editDueDate },
    });

    // 編集OFFに切り替え
    setIsEditing(false);

    // エラーメッセージを空にリセット
    setErrorMsg('');
  };

  return (
    <ListItem sx={listItemContainer}>
      {/* 左側：チェックボックス＋タスク内容 */}
      <div className="left-section">
        {/* チェックボックス表示 */}
        <Checkbox
          checked={todo.completed}
          // チェックされたタスクのIDを渡して関数を呼び出す
          onChange={() => changeCompleted(todo.id)}
          icon={<FaRegCircle color="#888" />}
          checkedIcon={<FaCheckCircle color="#65b7d8" />}
        />

        {isEditing ? (
          // 編集ONの場合
          <div className="todo-edit-form">
            {/* 入力欄表示 */}
            <TextField
              label="タスク"
              variant="outlined"
              value={editInput}
              onChange={editInputChange}
              fullWidth
              sx={{
                flex: 2,
                minWidth: 120,
                ...inputFieldBase,
              }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            {/* 期日欄表示 */}
            <TextField
              label="期日"
              type="date"
              value={editDueDate}
              onChange={editDueDateChange}
              fullWidth
              sx={{
                flex: 1,
                minWidth: 130,
                ...inputFieldBase,
              }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            {/* 保存ボタン表示 */}
            <IconButton onClick={saveTodo} sx={iconButtonSaveStyle}>
              <FaSave />
            </IconButton>

            {/* 入力エラーメッセージ表示 */}
            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </div>
        ) : (
          // 編集OFFの場合
          <>
            {/* タスク内容表示 */}
            <ListItemText
              primary={todo.text}
              slotProps={{
                primary: {
                  sx: {
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#000',
                  },
                },
              }}
            />

            {/* タスク期日 */}
            {todo.dueDate && (
              <span className="due-date"> {formatDate(todo.dueDate)}</span>
            )}
          </>
        )}
      </div>

      {/* 右側：編集・削除ボタン */}
      <div className="right-section">
        {isEditing ? (
          <>
            {/* キャンセルボタン表示 */}
            <IconButton onClick={cancelEdit} sx={iconButtonCancelStyle}>
              <FaUndoAlt />
            </IconButton>
          </>
        ) : (
          <>
            {/* 編集ボタン表示 */}
            <IconButton onClick={startEdit} sx={iconButtonEditStyle}>
              <FaEdit />
            </IconButton>
          </>
        )}

        {/* 削除ボタン表示 */}
        <IconButton
          onClick={() => deleteTodo(todo.id)}
          sx={iconButtonDeleteStyle}
        >
          <FaTrash />
        </IconButton>
      </div>
    </ListItem>
  );
}

export default TodoItem;
