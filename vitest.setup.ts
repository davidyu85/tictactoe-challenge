import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

/**
 * Visualize Tic Tac Toe game state inside a snapshot test
 */
export function renderGameStateSnapShot() {
  const gameState = screen
    .getAllByRole('button')
    .map(({ innerHTML }, i) => (i % 3 === 2 ? innerHTML + '\n' : innerHTML))
    .join(' ');

  expect('\n ' + gameState).toMatchSnapshot();
}
