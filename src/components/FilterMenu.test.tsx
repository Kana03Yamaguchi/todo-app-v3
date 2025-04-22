import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { noop } from '../utils/noop';
import FilterMenu from './FilterMenu';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

describe('FilterMenu', () => {
  it('フィルターの各項目が表示されていること', async () => {
    render(
      <MantineProvider>
        <FilterMenu onChange={noop} />
      </MantineProvider>,
    );

    // フィルターメニューをクリックして展開
    const menuButton = screen.getByRole('button', {
      name: 'フィルターメニュー',
    });
    await userEvent.click(menuButton);

    // ドロップダウンの中を探す
    const dropdown = await screen.findByRole('menu');

    // ドロップダウン内で「すべて」「未完了」「完了済」を確認
    expect(within(dropdown).getByText('すべて')).toBeInTheDocument();
    expect(within(dropdown).getByText('未完了')).toBeInTheDocument();
    expect(within(dropdown).getByText('完了済')).toBeInTheDocument();
  });
});
