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

// リスト項目の外枠スタイル（1行ごとの見た目）
export const listItemContainer = {
  // 子要素を横並びにする
  display: 'flex',
  // 左右に要素を分ける
  justifyContent: 'space-between',
  // 縦方向の中央揃え
  alignItems: 'center',
  // 内側の余白を設定
  padding: '14px 20px',
  // 下線のように境界線を引く
  borderBottom: '1px solid #ddd',
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

// メニュー全体（Paper）のスタイル
export const filterMenuPaperStyle = {
  // メニューの見た目設定（背景・角丸・サイズ）
  width: 100,
  backgroundColor: '#fff',
  borderRadius: 8,
};
