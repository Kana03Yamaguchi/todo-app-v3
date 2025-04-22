# TODO アプリ

## 概要

- シンプルな TODO 管理アプリ
- タスクの追加・編集・削除・完了管理が可能
- 削除したタスクも後から確認できるアコーディオン機能付き
- 入力チェックや期日の指定など、日常的に使いやすい機能を搭載

## 機能一覧

- タスクの追加（タスク入力必須、未入力の場合エラー表示、期日入力は任意）
- タスクの編集（内容・期日の変更が可能）
- タスクの期日表示
- 完了状態の切り替え（チェックアイコンでON/OFF）
- タスクの削除（削除済タスクはアコーディオン内に保持）
- フィルター切り替え（すべて／未完了／完了済）
- localStorage によるデータ永続化
- レスポンシブ対応
- ユニットテスト実装（React Testing Library）

## 技術スタック

- TypeScript
- React
- CSS
- Mantine UI
- localStorage
- React Icons
- Vitest（React Testing Library）

## 使い方

```bash
git clone https://github.com/Kana03Yamaguchi/todo-app-v3.git
cd todo-app-v3
npm install
npm run dev
```

## 今後の改善案

- タスクの並び替え機能
- 複数選択＆一括削除／完了機能
- 削除タスクの復元
