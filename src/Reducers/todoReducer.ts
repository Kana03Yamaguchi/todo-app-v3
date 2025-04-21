import { Action, TodoType } from '../Types/TodoType';

// Reducer関数：状態変更のルール
export function todoReducer(state: TodoType[], action: Action): TodoType[] {
  switch (action.type) {
    case 'ADD': {
      // 新しいIDを発番（最大ID + 1）
      const newId =
        state.length > 0 ? Math.max(...state.map((t) => t.id)) + 1 : 1;

      // タスクを追加
      return [
        ...state,
        {
          id: newId,
          text: action.payload.text,
          dueDate: action.payload.dueDate,
          completed: false,
        },
      ];
    }
    case 'CHANGE_COMPLETED':
      return state.map((todo) => {
        return todo.id === action.payload
          ? // IDが一致したら完了状態を反転
            { ...todo, completed: !todo.completed }
          : // IDが一致しない場合はそのまま
            todo;
      });
    case 'EDIT':
      return state.map((todo) => {
        // IDが一致しない場合は変更せずそのまま返す
        if (todo.id !== action.payload.id) return todo;

        // IDが一致するタスクを元に、新しいオブジェクトを作成
        const updatedTodo = { ...todo };

        // タスク内容が指定されている場合だけ更新
        if (action.payload.text !== undefined) {
          updatedTodo.text = action.payload.text;
        }

        // タスク期日が指定されている場合だけ更新
        if (action.payload.dueDate !== undefined) {
          updatedTodo.dueDate = action.payload.dueDate;
        }

        // 更新後のタスクを返す
        return updatedTodo;
      });
    case 'DELETE':
      return state.filter((todo) => {
        // タスクを削除（IDが一致しないものだけ残す）
        return todo.id !== action.payload;
      });
    default:
      return state;
  }
}
