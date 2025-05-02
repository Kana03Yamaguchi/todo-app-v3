// 入力フィールドの共通スタイル
export const inputFieldBase = {
  // 入力欄全体の角丸と背景色の指定
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: 'none',
  },
  // デフォルトの枠線を非表示にする
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

// ボタン全体に共通のスタイル
export const iconButtonBase = {
  padding: '8px 12px',
  fontSize: '16px',
  background: 'none',
  border: 'none',
  color: '#333',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
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

// フィルターボタンのスタイル
export const filterMenuButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

// メニュー全体（Paper）のスタイル
export const filterMenuPaperStyle = {
  // メニューの見た目設定（背景・角丸・サイズ）
  width: 100,
  backgroundColor: '#fff',
  borderRadius: 8,
};
