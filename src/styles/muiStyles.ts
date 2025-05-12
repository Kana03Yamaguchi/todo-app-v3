// 共通：フォーカス＆ホバー時の枠線を削除
export const focusAndHoverClearStyle = {
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:hover': {
    boxShadow: 'none',
  },
};

// ナビゲーション全体のスタイル（左カラム）
export const navMenuContainer = {
  width: '250px',
  backgroundColor: '#f5f5f5',
  height: '100%',
  padding: '16px 12px',
  boxSizing: 'border-box',
  borderRight: '1px solid #ddd',
};

// ナビゲーション内の各ボタンスタイル
export const navMenuItemStyle = {
  borderRadius: '8px',
  padding: '10px 16px',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
};

// 選択中メニューの背景強調
export const navMenuSelectedStyle = {
  backgroundColor: '#e0f7fa !important',
  '& .MuiListItemIcon-root': {
    color: '#0288d1',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
    color: '#0288d1',
  },
};

// メニュー全体（Paper）のスタイル
export const filterMenuPaperStyle = {
  // メニューの見た目設定（背景・角丸・サイズ）
  width: 100,
  backgroundColor: '#fff',
  borderRadius: 8,
};

// 入力フィールドの共通スタイル
export const inputFieldBase = {
  // 入力欄全体の角丸と背景色の指定
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: 'none',
    // フォーカス時の枠線（アウトライン）を削除
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    // フォーカス時の影（青い枠）を削除
    ...focusAndHoverClearStyle,
  },
  // デフォルトのアウトライン（囲い線）を削除
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  // 入力文字部分の内側の余白調整
  '& .MuiInputBase-input': {
    padding: '10px 12px',
  },
};

// テキストスタイル（タスク内容部分）
export const taskTextStyle = {
  fontSize: '16px', // フォントサイズ
  fontWeight: '500', // 太字
  color: '#333', // テキスト色（ダークグレー）
  textDecoration: 'none', // 完了していないタスクの取り消し線を削除
  transition: 'all 0.3s ease', // ホバー時のスムーズな遷移
};

// 期日部分のテキストスタイル
export const dueDateTextStyle = {
  fontSize: '14px',
  color: '#ff4747', // 期限が近い場合や重要な日付を赤く表示
};

// アイコン部分のスタイル
export const taskIconStyle = {
  fontSize: '20px',
  color: '#888', // アイコン色（グレー）
};

// リスト項目の外枠スタイル（1行ごとの見た目）
export const listItemContainer = {
  // 子要素を横並びにする
  display: 'flex',
  // 左右に要素を分ける
  justifyContent: 'space-between',
  // 縦方向の中央揃え
  alignItems: 'center',
  // 内側の余白を設定
  padding: '20px 24px',
  // 下線のように境界線を引く
  borderBottom: '1px solid #ddd',
  // アイコンとテキストの間隔
  gap: '12px',
  // 画面幅
  width: '100%',
  // 画面幅：最小幅制限
  minWidth: '500px',
  // 画面幅：最大幅制限
  maxWidth: '100%',
  // 中央寄せ
  margin: '0 auto',
};

// ボタン共通のスタイル
export const commonButtonStyle = {
  borderRadius: '12px',
  padding: '12px',
  minWidth: '48px',
  // フォーカス時の枠線を削除
  ...focusAndHoverClearStyle,
};

// フィルターボタンのスタイル
export const filterMenuButtonStyle = {
  ...commonButtonStyle,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

// 削除済みトグルボタンのスタイル
export const deletedToggleButtonStyle = {
  ...commonButtonStyle,
  backgroundColor: 'transparent',
  color: '#333',
  marginTop: '24px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

// リスト内ボタン全体に共通のスタイル
export const iconButtonBase = {
  padding: '8px 12px',
  fontSize: '16px',
  background: 'none',
  border: 'none',
  color: '#333',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  // フォーカス時の枠線を削除
  ...focusAndHoverClearStyle,
};

// 編集ボタンのスタイル
export const iconButtonEditStyle = {
  ...iconButtonBase,
  '&:hover': {
    // ホバー時に緑
    color: '#04d24f',
  },
};

// 削除ボタンのスタイル
export const iconButtonDeleteStyle = {
  ...iconButtonBase,
  marginLeft: '16px',
  '&:hover': {
    // ホバー時に赤茶
    color: '#b06e6e',
  },
};

// 保存ボタンのスタイル
export const iconButtonSaveStyle = {
  ...iconButtonBase,
  '&:hover': {
    // ホバー時に青
    color: '#4fa4ca',
  },
};

// キャンセルボタンのスタイル
export const iconButtonCancelStyle = {
  ...iconButtonBase,
  '&:hover': {
    // ホバー時にオレンジ
    color: '#ff9324',
  },
};

// 編集モーダル全体のスタイル
export const editDialogPaperStyle = {
  minWidth: '440px',
  minHeight: '320px',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
};

// モーダルの中の入力欄エリア
export const editDialogContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  mt: 2,
  overflow: 'visible',
};

// モーダル下部のアクション
export const editDialogActionsStyle = {
  justifyContent: 'flex-end',
  gap: 2,
  pt: 2,
};

// 編集モーダルの入力欄
export const modalInputFieldStyle = {
  ...inputFieldBase,
  '& .MuiOutlinedInput-root': {
    ...inputFieldBase['& .MuiOutlinedInput-root'],
    backgroundColor: '#f8f8f8',
    fontSize: '16px',
  },
  '& .MuiInputBase-input': {
    fontSize: '16px',
    padding: '12px 14px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
  },
};
