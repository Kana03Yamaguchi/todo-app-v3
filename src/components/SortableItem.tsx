import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

/**
 * props定義
 */
interface SortableItemProps {
  id: string; // 一意に識別するID
  children: React.ReactNode; // 中に入れる表示内容（Todoなど）
}

/**
 * SortableItemコンポーネント：子要素をドラッグで並び替えられるようにする
 */
function SortableItem({ id, children }: SortableItemProps) {
  const {
    // ドラッグ対象のNodeを参照
    setNodeRef,
    // ドラッグ対象をタグ付け
    attributes,
    // マウスでつかむ操作を検知するイベント
    listeners,
    // ドラッグ対象の要素の位置を取得
    transform,
    // ドラッグ中のアニメーションを設定
    transition,
  } = useSortable({ id });

  // ドラッグ中のスタイル（移動位置・アニメーション）
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div {...listeners} style={{ cursor: 'grab', marginRight: 8 }}>
          ⠿
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default SortableItem;
