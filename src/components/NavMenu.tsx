import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import { FilterStatus, MenuType } from '../Types/TodoType';
import { useCallback } from 'react';

/**
 * propsの型定義
 */
interface NavMenuProps {
  selectedMenu: MenuType; // 現在選択されているメニュー
  onSelect: (menu: MenuType) => void; // メニュー選択時の関数
  filter: FilterStatus; // 現在のフィルター状態
  setFilter: React.Dispatch<React.SetStateAction<FilterStatus>>; // フィルター状態を更新する関数
}

/**
 * NavMenuコンポーネント：左カラムに表示するナビメニュー
 */
function NavMenu({ selectedMenu, onSelect, filter, setFilter }: NavMenuProps) {
  console.log(filter);

  /**
   * メモ化
   */
  // 今日 / 全てのタスク切り替え
  const handleToggleToday = useCallback(() => {
    const nextMenu = selectedMenu === 'today' ? 'all' : 'today';
    onSelect(nextMenu);
    setFilter('all');
  }, [selectedMenu, onSelect, setFilter]);

  // 未完了タスク選択
  const handleActiveClick = useCallback(() => {
    onSelect('active');
    setFilter('active');
  }, [onSelect, setFilter]);

  // 完了済タスク選択
  const handleCompletedClick = useCallback(() => {
    onSelect('completed');
    setFilter('completed');
  }, [onSelect, setFilter]);

  // 削除済みタスク選択
  const handleDeletedClick = useCallback(() => {
    onSelect('deleted');
  }, [onSelect]);
  return (
    <List>
      {/* 今日のタスク／全てのタスク切り替えボタン */}
      <ListItemButton
        selected={selectedMenu === 'today' || selectedMenu === 'all'}
        onClick={handleToggleToday}
      >
        <ListItemIcon>
          {selectedMenu === 'today' ? <ChecklistIcon /> : <TodayIcon />}
        </ListItemIcon>
        <ListItemText
          primary={selectedMenu === 'today' ? '全てのタスク' : '今日のタスク'}
        />
      </ListItemButton>
      {/* 未完了タスクのフィルターボタン */}
      <ListItemButton
        selected={selectedMenu === 'active'}
        onClick={handleActiveClick}
      >
        <ListItemIcon>
          <RadioButtonUncheckedIcon />
        </ListItemIcon>
        <ListItemText primary="未完了タスク" />
      </ListItemButton>
      {/* 完了済タスクのフィルターボタン */}
      <ListItemButton
        selected={selectedMenu === 'completed'}
        onClick={handleCompletedClick}
      >
        <ListItemIcon>
          <CheckCircleIcon />
        </ListItemIcon>
        <ListItemText primary="完了済タスク" />
      </ListItemButton>
      {/* 削除済タスクのフィルターボタン */}
      <ListItemButton
        selected={selectedMenu === 'deleted'}
        onClick={handleDeletedClick}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="削除済タスク" />
      </ListItemButton>{' '}
    </List>
  );
}

export default NavMenu;
