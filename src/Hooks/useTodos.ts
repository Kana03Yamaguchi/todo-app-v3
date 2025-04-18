import { useContext } from 'react';
import { TodoContext } from '../Contexts/TodoContext';

export const useTodos = () => {
  // Contextから取得
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodosは<TodoContext.Provider>の中で使ってください');
  }
  return context;
};
