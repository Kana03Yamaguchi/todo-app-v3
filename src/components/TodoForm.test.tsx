// import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { describe, it, expect, vi } from 'vitest';
// import { TodoContext } from '../Contexts/TodoContext';
// import TodoForm from './TodoForm';
// import { noop } from '../utils/noop';

// describe('TodoForm', () => {
//   it('タスク入力欄が表示されていること', () => {
//     render(
//       <TodoContext.Provider value={{ todos: [], dispatch: noop }}>
//         <TodoForm />
//       </TodoContext.Provider>,
//     );

//     // プレースホルダーが "タスクを入力" の input が存在することを確認
//     const input = screen.getByPlaceholderText('タスクを入力');
//     expect(input).toBeInTheDocument();
//   });

//   it('タスクを入力して追加ボタンを押すと dispatch が呼ばれる', async () => {
//     // dispatch をモック関数に置き換え
//     const mockDispatch = vi.fn();

//     render(
//       <TodoContext.Provider value={{ todos: [], dispatch: mockDispatch }}>
//         <TodoForm />
//       </TodoContext.Provider>,
//     );

//     // タスク入力欄を取得
//     const input = screen.getByPlaceholderText('タスクを入力');
//     // タスクを入力
//     await userEvent.type(input, 'テストタスク');

//     // ボタンを取得（最初のボタンを取得）
//     const addButton = screen.getByRole('button');
//     // ボタンをクリック
//     await userEvent.click(addButton);

//     // dispatch が1回呼ばれていることを確認
//     expect(mockDispatch).toHaveBeenCalled();

//     // dispatch の呼び出し内容を確認
//     expect(mockDispatch).toHaveBeenCalledWith({
//       type: 'ADD',
//       payload: {
//         text: 'テストタスク',
//         dueDate: undefined,
//       },
//     });
//   });

//   it('空欄で追加ボタンを押すと dispatch は呼ばれず、エラーが表示される', async () => {
//     const mockDispatch = vi.fn();

//     render(
//       <TodoContext.Provider value={{ todos: [], dispatch: mockDispatch }}>
//         <TodoForm />
//       </TodoContext.Provider>,
//     );

//     const addButton = screen.getByRole('button');
//     await userEvent.click(addButton);

//     // dispatch が呼ばれていないことを確認
//     expect(mockDispatch).not.toHaveBeenCalled();

//     // エラーメッセージが表示されていること
//     expect(screen.getByText('タスクを入力してください')).toBeInTheDocument();
//   });

//   it('期日を入力して追加ボタンを押すと dispatch が呼ばれる', async () => {
//     const mockDispatch = vi.fn();

//     render(
//       <TodoContext.Provider value={{ todos: [], dispatch: mockDispatch }}>
//         <TodoForm />
//       </TodoContext.Provider>,
//     );

//     // タスク入力欄を取得
//     const input = screen.getByPlaceholderText('タスクを入力');
//     // タスクを入力
//     await userEvent.type(input, 'テストタスク');

//     // 期日入力欄を取得
//     const dateInput = screen.getByDisplayValue('');
//     // 期日を入力
//     fireEvent.change(dateInput, { target: { value: '2024-05-01' } });

//     // 追加ボタンをクリック
//     const addButton = screen.getByRole('button');
//     await userEvent.click(addButton);

//     // dispatch が呼ばれていること
//     expect(mockDispatch).toHaveBeenCalledWith({
//       type: 'ADD',
//       payload: {
//         text: 'テストタスク',
//         dueDate: '2024-05-01',
//       },
//     });
//   });
// });
