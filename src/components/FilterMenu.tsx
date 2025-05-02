import { useState } from 'react';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (filter: FilterStatus) => {
    onChange(filter);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="フィルターメニュー"
        sx={filterMenuButtonStyle}
      >
        <FilterAltIcon sx={{ color: '#444' }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
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
        <MenuItem onClick={() => handleFilter('all')}>すべて</MenuItem>
        <MenuItem onClick={() => handleFilter('active')}>未完了</MenuItem>
        <MenuItem onClick={() => handleFilter('completed')}>完了済</MenuItem>
      </Menu>
    </>
  );
}

export default FilterMenu;
