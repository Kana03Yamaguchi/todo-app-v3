import { ActionIcon, Menu } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';

/**
 * props定義
 */
interface FilterMenuProps {
  onChange: (filter: 'all' | 'active' | 'completed') => void;
}

/**
 * FilterMenuコンポーネント：「すべて／未完了／完了済み」のフィルター切り替え
 */
function FilterMenu({ onChange }: FilterMenuProps) {
  // 「すべて」を選択時
  const allClick = () => onChange('all');
  // 「未完了」を選択時
  const activeClick = () => onChange('active');
  // 「完了済」を選択時
  const completedClick = () => onChange('completed');

  return (
    <Menu
      shadow="sm"
      width={180}
      position="bottom"
      withArrow
      withinPortal={false}
      offset={4}
      transitionProps={{ transition: 'pop-top-left', duration: 150 }}
    >
      {/* メニュー表示 */}
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="フィルターメニュー"
          styles={{
            root: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              outline: 'none',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
            },
          }}
        >
          <IconFilter size={20} color="#444" />
        </ActionIcon>
      </Menu.Target>

      {/* メニューリスト */}
      <Menu.Dropdown
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 0,
          width: 70,
        }}
      >
        {[
          { label: 'すべて', onClick: allClick },
          { label: '未完了', onClick: activeClick },
          { label: '完了済', onClick: completedClick },
        ].map((item, index) => (
          <Menu.Item
            key={index}
            onClick={item.onClick}
            styles={{
              item: {
                backgroundColor: '#fff',
                color: '#333',
                fontSize: '14px',
                padding: '8px 12px',
                outline: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#f2f2f2',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'none',
                },
              },
            }}
          >
            {item.label}
          </Menu.Item>
        ))}{' '}
      </Menu.Dropdown>
    </Menu>
  );
}

export default FilterMenu;
