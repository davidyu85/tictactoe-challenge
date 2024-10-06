import { vi, describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GameModeSelection from './GameModeSelection';

const mockSwitchModeFn = vi.fn();

describe('GameModeSelection', () => {
  it('sends the correct state to switch the game mode', () => {
    render(<GameModeSelection onClickToSwitchMode={mockSwitchModeFn} />);
    fireEvent.click(screen.getByText('Single player standard mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer: 2,
      initTime: expect.anything(),
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Single player wild mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer: 2,
      initTime: expect.anything(),
      wildMode: true,
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Single player standard mode - AI first'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer: 1,
      initTime: expect.anything(),
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Single player wild mode - AI first'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      computerIsPlayer: 1,
      initTime: expect.anything(),
      wildMode: true,
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Two players standard mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      initTime: expect.anything(),
    });

    mockSwitchModeFn.mockClear();

    fireEvent.click(screen.getByText('Two players wild mode'));
    expect(mockSwitchModeFn).toHaveBeenCalledWith({
      initTime: expect.anything(),
      wildMode: true,
    });
  });
});
