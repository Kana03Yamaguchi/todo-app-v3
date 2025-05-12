import TodoItem from './TodoItem';
import { Action, TodoType } from '../Types/TodoType';
import { Collapse, List } from '@mui/material';
import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

/**
 * props定義
 */
interface TodoListProps {
  deleteTodo: (id: number) => void; // 削除ボタン押下時用関数
  tasks: TodoType[]; // 親コンポーネントから渡されたタスクのリスト
  dispatch: React.Dispatch<Action>; // 親コンポーネントから渡された状態更新のための関数
}

/**
 * TodoListコンポーネント：タスク一覧表示
 */
function TodoList({ deleteTodo, tasks, dispatch }: TodoListProps) {
  // 削除ボタン押下時のタスクIDを管理
  const [removingTodoId, setRemovingTodoId] = useState<number | null>(null);

  /**
   * 完了状態切り替え処理
   */
  const changeCompleted = (id: number) => {
    dispatch({ type: 'CHANGE_COMPLETED', payload: id });
  };

  /**
   * 削除ボタンのアニメーション処理
   */
  const handleDeleteClick = (id: number) => {
    // 削除対象のタスクIDをセット
    setRemovingTodoId(id);

    setTimeout(() => {
      // タスクを削除
      deleteTodo(id);

      // 削除対象のタスクIDリセット
      setRemovingTodoId(null);
    }, 500);
  };

  /**
   * 並び替え確定処理（ドラッグ＆ドロップ終了時に呼ばれる）
   */
  const handleDragEnd = (event: DragEndEvent) => {
    // ドラッグ終了時のイベント（active: ドラッグ中の要素/over: ドロップ先の要素）
    const { active, over } = event;

    // overがnullの可能性があるためチェック
    if (!over) return;
    // IDが変わっていなければ並び替え不要
    if (active.id === over.id) return;

    // ドラッグ前の位置
    const oldIndex = tasks.findIndex((todo) => todo.id === Number(active.id));
    // ドロップ先の位置
    const newIndex = tasks.findIndex((todo) => todo.id === Number(over.id));
    // 並び替え対象のIDが見つからない場合は処理を終了
    if (oldIndex === -1 || newIndex === -1) return;

    // 並び替え処理
    const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
    dispatch({ type: 'REORDER_TASKS', payload: updatedTasks });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={tasks.map((todo) => String(todo.id))}
        strategy={verticalListSortingStrategy}
      >
        <List>
          {tasks.map((todo) => (
            <SortableItem key={todo.id} id={String(todo.id)}>
              <Collapse in={removingTodoId !== todo.id} timeout={500} appear>
                <TodoItem
                  todo={todo}
                  changeCompleted={changeCompleted}
                  onDelete={handleDeleteClick}
                />
              </Collapse>
            </SortableItem>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default TodoList;
