import { createContext } from 'react';
import { TodoType, Action } from '../Types/TodoType';

// 型定義：Context（todos状態とdispatch関数）
export type TodoContextType = {
  todos: TodoType[];
  dispatch: React.Dispatch<Action>;
};

// Context本体を作成
export const TodoContext = createContext<TodoContextType | null>(null);
