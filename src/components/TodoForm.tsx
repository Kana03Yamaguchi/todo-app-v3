import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { AddTodoPayload } from '../Types/TodoType';
import { useTodos } from '../Hooks/useTodos';
import { Button, TextField } from '@mui/material';
import { inputFieldBase } from '../styles/muiStyles';

/**
 * TodoFormコンポーネント：入力欄と追加ボタンを表示
 */
function TodoForm() {
  // 入力欄の内容を管理
  const [input, setInput] = useState('');
  // 期日を管理
  const [dueDate, setDueDate] = useState('');
  // エラーメッセージ表示を管理
  const [errorMsg, setErrorMsg] = useState('');

  // useTodosからContextを取得
  const { dispatch } = useTodos();

  /**
   * 入力内容変更処理
   */
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力された文字を保持
    setInput(e.target.value);
  };

  /**
   * 期日変更処理
   */
  const dueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  /**
   * タスク追加ボタン処理
   */
  const addTodo = () => {
    // 入力欄が空白の場合はTODO追加しない
    if (input.trim() === '') {
      setErrorMsg('タスクを入力してください');
      return;
    }

    // 新規タスク追加用のオブジェクト作成
    const newTodo: AddTodoPayload = {
      text: input, // タスク内容（入力された内容）
      dueDate: dueDate || undefined, // タスク期日（任意選択された期日）
    };
    // タスクを追加する
    dispatch({ type: 'ADD', payload: newTodo });

    // 入力欄を空にリセット
    setInput('');
    // 期日を空にリセット
    setDueDate('');
    // エラーメッセージを空にリセット
    setErrorMsg('');
  };

  return (
    <div>
      <div className="todo-form">
        {/* 入力欄表示 */}
        <TextField
          label="タスク"
          variant="outlined"
          value={input}
          onChange={inputChange}
          fullWidth
          sx={inputFieldBase}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        {/* 期日欄表示 */}
        <TextField
          label="期日"
          type="date"
          value={dueDate}
          onChange={dueDateChange}
          fullWidth
          sx={{ minWidth: 130, ...inputFieldBase }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        {/* 追加ボタン表示 */}
        <Button
          onClick={addTodo}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '12px',
            padding: '12px',
            minWidth: '48px',
          }}
        >
          <FaPlus />
        </Button>
      </div>

      {/* 入力エラーメッセージ表示 */}
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
}

export default TodoForm;
