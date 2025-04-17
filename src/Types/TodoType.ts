/**
 * 型定義：TODO
 */
export interface TodoType {
  id: number; // タスクID
  text: string; // タスク内容
  completed: boolean; // 完了状態（true: 完了 / false: 未完了）
}

// 型定義：アクション（命令の種類）
export type Action =
  | { type: 'ADD'; payload: TodoType } // タスク追加
  | { type: 'CHANGE_COMPLETED'; payload: number } // 完了状態切り替え
  | { type: 'DELETE'; payload: number }; // タスク削除
