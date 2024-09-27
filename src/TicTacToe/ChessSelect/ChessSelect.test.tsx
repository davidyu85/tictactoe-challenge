import { render, screen } from '@testing-library/react';
import { vi, it, expect, describe } from 'vitest';
import ChessSelect from './ChessSelect';

describe('ChessSelect', () => {
  const mockRef = vi.fn();

  it('displays both label with select combo box if wildMode is on', () => {
    render(
      <ChessSelect wildMode={true} isPlayerTwoTurn={false} ref={mockRef} />
    );

    expect(
      screen.getByText(/Wild mode allows you to play either X or O/i)
    ).toBeVisible();

    expect(screen.getByDisplayValue('X')).toBeVisible();
  });

  it('displays standard setup for first player - starts with X and hide the select combo box', () => {
    render(
      <ChessSelect wildMode={false} isPlayerTwoTurn={false} ref={mockRef} />
    );

    expect(
      screen.getByText(/Standard mode lets you play X/i)
    ).toBeInTheDocument();

    expect(screen.queryByDisplayValue('X')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('O')).toBeNull();

    expect(screen.getByDisplayValue('X')).not.toBeVisible();
  });

  it('displays standard setup for second player - starts with O and hide the select combo box', () => {
    render(
      <ChessSelect wildMode={false} isPlayerTwoTurn={true} ref={mockRef} />
    );

    expect(
      screen.getByText(/Standard mode lets you play O/i)
    ).toBeInTheDocument();

    expect(screen.queryByDisplayValue('O')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('X')).toBeNull();

    expect(screen.getByDisplayValue('O')).not.toBeVisible();
  });
});
