import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TodoContext } from '../Contexts/TodoContext';
import TodoForm from './TodoForm';
import { noop } from '../utils/noop';

describe('TodoForm', () => {
  it('タスク入力欄が表示されていること', () => {
    render(
      <TodoContext.Provider value={{ todos: [], dispatch: noop }}>
        <TodoForm />
      </TodoContext.Provider>,
    );

    const input = screen.getByPlaceholderText('タスクを入力');
    expect(input).toBeInTheDocument();
  });
});
