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
  Collapse,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  editDialogActionsStyle,
  editDialogContentStyle,
  editDialogPaperStyle,
  iconButtonCancelStyle,
  iconButtonDeleteStyle,
  iconButtonEditStyle,
  iconButtonSaveStyle,
  listItemContainer,
  modalInputFieldStyle,
} from '../styles/muiStyles';
import Tooltip from '@mui/material/Tooltip';

/**
 * props定義
 */
interface TodoItemProps {
  todo: TodoType; // タスクデータ
  changeCompleted: (id: number) => void; // 完了状態切り替え用関数
  onDelete: (id: number) => void; // 削除ボタン押下時用関数
}

/**
 * TodoItemコンポーネント：タスク項目を表示（完了状態、タスク内容 、削除ボタン）
 */
function TodoItem({ todo, changeCompleted, onDelete }: TodoItemProps) {
  // 入力欄の内容を管理（編集用）
  const [editInput, setEditInput] = useState(todo.text);
  // 期日の内容を管理（編集用）
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  // エラーメッセージ表示を管理
  const [errorMsg, setErrorMsg] = useState('');
  // 編集モーダルの開閉を管理
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    // モーダルを開く
    setIsDialogOpen(true);
  };

  /**
   * タスク編集キャンセルボタン処理
   */
  const cancelEdit = () => {
    // モーダルを閉じる
    setIsDialogOpen(false);
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

    // モーダルを閉じる
    setIsDialogOpen(false);

    // エラーメッセージを空にリセット
    setErrorMsg('');
  };

  return (
    <>
      <ListItem
        sx={{
          ...listItemContainer,
          backgroundColor: todo.completed ? '#e0e0e0' : '#eeeeee',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* 左側：チェックボックス＋タスク内容 */}
        <div className="left-section">
          <Checkbox
            checked={todo.completed}
            onChange={() => changeCompleted(todo.id)}
            icon={<FaRegCircle color="#888" />}
            checkedIcon={<FaCheckCircle color="#65b7d8" />}
          />

          <Collapse in={!isDialogOpen} timeout={300} appear unmountOnExit>
            <div>
              <ListItemText
                primary={todo.text}
                slotProps={{
                  primary: {
                    sx: {
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#888' : '#000',
                      transition: 'all 0.3s ease',
                    },
                  },
                }}
              />
              {todo.dueDate && (
                <span className="due-date">{formatDate(todo.dueDate)}</span>
              )}
            </div>
          </Collapse>
        </div>

        {/* 右側：編集・削除ボタン */}
        <div className="right-section">
          <Tooltip title="編集" arrow>
            <IconButton onClick={startEdit} sx={iconButtonEditStyle}>
              <FaEdit />
            </IconButton>
          </Tooltip>

          <Tooltip title="削除" arrow>
            <IconButton
              onClick={() => onDelete(todo.id)}
              sx={iconButtonDeleteStyle}
            >
              <FaTrash />
            </IconButton>
          </Tooltip>
        </div>
      </ListItem>

      {/* 編集モーダル */}
      <Dialog
        open={isDialogOpen}
        onClose={cancelEdit}
        slotProps={{
          paper: {
            sx: editDialogPaperStyle,
          },
        }}
      >
        <DialogTitle>タスクの編集</DialogTitle>
        <DialogContent sx={editDialogContentStyle}>
          <TextField
            label="タスク"
            variant="outlined"
            value={editInput}
            onChange={editInputChange}
            fullWidth
            sx={modalInputFieldStyle}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="期日"
            type="date"
            value={editDueDate}
            onChange={editDueDateChange}
            fullWidth
            sx={modalInputFieldStyle}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </DialogContent>
        <DialogActions sx={editDialogActionsStyle}>
          {/* キャンセルボタン表示 */}
          <Tooltip title="キャンセル" arrow>
            <IconButton onClick={cancelEdit} sx={iconButtonCancelStyle}>
              <FaUndoAlt />
            </IconButton>
          </Tooltip>
          {/* 保存ボタン表示 */}
          <Tooltip title="保存" arrow>
            <IconButton onClick={saveTodo} sx={iconButtonSaveStyle}>
              <FaSave />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TodoItem;
