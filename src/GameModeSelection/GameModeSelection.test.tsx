import { vi, describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GameModeSelection from './GameModeSelection';

const mockSwitchModeFn = vi.fn();

describe('GameModeSelection', () => {
  it('sends the correct state to switch the game mode', () => {
    render(<GameModeSelection onClickToSwitchMode={mockSwitchModeFn} />);
    fireEvent.click(screen.getByText('Single player standard mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer2: true,
      initTime: expect.anything(),
      wildMode: false,
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Single player wild mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer2: true,
      initTime: expect.anything(),
      wildMode: true,
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Two players standard mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer2: false,
      initTime: expect.anything(),
      wildMode: false,
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Two players wild mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer2: false,
      initTime: expect.anything(),
      wildMode: true,
    });
  });
});
