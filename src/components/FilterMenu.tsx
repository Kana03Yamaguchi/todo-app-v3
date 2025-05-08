import { useMemo, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterStatus } from '../Types/TodoType';
import {
  filterMenuButtonStyle,
  filterMenuPaperStyle,
} from '../styles/muiStyles';

/**
 * props定義
 */
interface FilterMenuProps {
  onChange: (filter: FilterStatus) => void;
}

/**
 * FilterMenuコンポーネント：「すべて／未完了／完了済み」のフィルター切り替え
 */
function FilterMenu({ onChange }: FilterMenuProps) {
  // メニューの開閉状態を管理
  const [menuTarget, setMenuTarget] = useState<null | HTMLElement>(null);
  // メニューの開閉状態（true:開いている/false:閉じている）
  const isOpen = Boolean(menuTarget);

  /**
   * メニューを開く処理
   */
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuTarget(event.currentTarget);
  };

  /**
   * メニューを閉じる処理
   */
  const handleClose = () => {
    setMenuTarget(null);
  };

  /**
   * メモ化
   */
  // フィルター変更処理（フィルター変更時のみ再計算）
  const filterHandlers = useMemo(() => {
    // フィルター変更の実行処理
    const handleFilter = (filter: FilterStatus) => {
      onChange(filter);
      handleClose();
    };
    return {
      all: () => handleFilter('all'),
      active: () => handleFilter('active'),
      completed: () => handleFilter('completed'),
    };
  }, [onChange]);

  return (
    <>
      {/* フィルターアイコンボタン */}
      <IconButton
        onClick={handleOpen}
        aria-label="フィルターメニュー"
        sx={filterMenuButtonStyle}
      >
        <FilterAltIcon sx={{ color: '#444' }} />
      </IconButton>

      {/* フィルターメニュー本体 */}
      <Menu
        anchorEl={menuTarget}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: filterMenuPaperStyle,
          },
        }}
      >
        {/* メニュー項目（クリックでフィルターを切り替え） */}
        <MenuItem onClick={filterHandlers.all}>すべて</MenuItem>
        <MenuItem onClick={filterHandlers.active}>未完了</MenuItem>
        <MenuItem onClick={filterHandlers.completed}>完了済</MenuItem>
      </Menu>
    </>
  );
}

export default FilterMenu;
