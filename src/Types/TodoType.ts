/**
 * 型定義：TODO
 */
export interface TodoType {
  id: number; // タスクID
  text: string; // タスク内容
  dueDate?: string; // タスク期日
  completed: boolean; // 完了状態（true: 完了 / false: 未完了）
}

/**
 *  型定義：フィルター状態
 */
export type FilterStatus = 'all' | 'active' | 'completed';

/**
 * ADD：追加用プロパティ
 */
export type AddTodoPayload = Pick<TodoType, 'text' | 'dueDate'>;

/**
 * EDIT：編集用プロパティ（idは必須、それ以外は任意）
 */
type EditTodoPayload = {
  id: number;
} & Partial<Pick<TodoType, 'text' | 'dueDate'>>;

// 型定義：アクション（命令の種類）
export type Action =
  | { type: 'ADD'; payload: AddTodoPayload } // タスク追加
  | { type: 'CHANGE_COMPLETED'; payload: number } // 完了状態切り替え
  | { type: 'EDIT'; payload: EditTodoPayload } // タスク編集
  | { type: 'DELETE'; payload: number }; // タスク削除
