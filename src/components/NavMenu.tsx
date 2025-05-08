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
import { MenuType } from '../Types/TodoType';

/**
 * propsの型定義
 */
interface NavMenuProps {
  selectedMenu: MenuType; // 現在選択されているナビメニュー
  onSelect: (menu: MenuType) => void; // メニュー選択時に実行される関数
  isAccordionOpen: boolean; // 削除済みタスクのアコーディオンが開いているかどうか
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>; // アコーディオンの開閉状態を切り替える関数
  filter: string; // 現在のタスクリストのフィルター状態
  setFilter: React.Dispatch<React.SetStateAction<string>>; // フィルター状態を更新する関数
}

/**
 * NavMenuコンポーネント：左カラムに表示するナビメニュー
 */
function NavMenu({
  selectedMenu,
  onSelect,
  isAccordionOpen,
  setIsAccordionOpen,
  filter,
  setFilter,
}: NavMenuProps) {
  return (
    <List>
      {/* 今日のタスク／全てのタスク切り替えボタン */}
      <ListItemButton
        selected={selectedMenu === 'today' || selectedMenu === 'all'}
        onClick={() => onSelect(selectedMenu === 'today' ? 'all' : 'today')}
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
        onClick={() => onSelect('active')}
      >
        <ListItemIcon>
          <RadioButtonUncheckedIcon />
        </ListItemIcon>
        <ListItemText primary="未完了タスク" />
      </ListItemButton>

      {/* 完了済みタスクのフィルターボタン */}
      <ListItemButton
        selected={selectedMenu === 'completed'}
        onClick={() => onSelect('completed')}
      >
        <ListItemIcon>
          <CheckCircleIcon />
        </ListItemIcon>
        <ListItemText primary="完了済みタスク" />
      </ListItemButton>

      {/* 削除済みタスクのフィルターボタン */}
      <ListItemButton
        selected={selectedMenu === 'deleted'}
        onClick={() => onSelect('deleted')}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="削除済みタスク" />
      </ListItemButton>
    </List>
  );
}

export default NavMenu;
