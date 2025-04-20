import { Action, TodoType } from '../Types/TodoType';

// Reducer関数：状態変更のルール
export function todoReducer(state: TodoType[], action: Action): TodoType[] {
  switch (action.type) {
    case 'ADD':
      // タスクを追加する
      return [...state, action.payload];
    case 'CHANGE_COMPLETED':
      return state.map((todo) => {
        return todo.id === action.payload
          ? // IDが一致したら完了状態を反転
            { ...todo, completed: !todo.completed }
          : // IDが一致しない場合はそのまま
            todo;
      });
    case 'EDIT':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              dueDate: action.payload.dueDate,
            }
          : todo,
      );
    case 'DELETE':
      return state.filter((todo) => {
        // タスクを削除する（IDが一致しないものだけ残す）
        return todo.id !== action.payload;
      });
    default:
      return state;
  }
}
