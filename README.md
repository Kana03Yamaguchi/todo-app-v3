# TODO アプリ

## 概要

- シンプルな TODO 管理アプリ
- 基本仕様：タスクの追加、完了/未完了の切り替え、削除したタスクの表示
- その他仕様：入力チェック機能や削除履歴が閲覧可能

## 機能一覧

- タスクの追加（タスク入力必須、未入力の場合エラー表示）
- タスクの一覧表示
- 完了状態の切り替え（チェックアイコンで切り替え）
- 削除済みタスクのアコーディオン管理
- localStorage でのデータ保持
- レスポンシブ対応

## 技術スタック

- TypeScript
- React
- CSS
- localStorage
- React Icons

## 使い方

```bash
git clone https://github.com/Kana03Yamaguchi/todo-app.git
cd todo-app
npm install
npm run dev
```

## 今後の改善案

- タスクの編集機能
- タスクの並び替え
- 削除タスクの復元
