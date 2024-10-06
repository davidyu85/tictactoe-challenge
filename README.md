# David Yu's Tic Tac Toe

The overall objective is to implement a proof-of-concept Tic Tac Toe game using React + TypeScript that allows a player to play either against another player or against a computer opponent. The game is played on a 3 X 3 grid and supports two game modes - standard and wild. This implementation completes the above objectives by adopting the methodologies described in the technical design document.

### Running the implementation

```bash
npm install
npm start

# or Vite's standard npm run dev
```

### Running test

```bash
# Run test in watch mode
npm test

# Test coverage without watch mode
npm run test:cov
```

### Major highlights

- Player can play with a computer opponent and picks who starts first
- The game can be played between two human players by taking turns clicking on the Tic Tac Toe board
- Standard gameplay always starts from X and than O
- Wild variant is made available for human players to player either X or O at any time
- The Minimax implementation makes computer playing optimally for both standard and wild
- Alpha-Beta Pruning is added into Minimax to improves performance when finding the best move
- Reaching to end game state would disable the board and announce who is the winning player
- Game can be restart anytime by clicking the menu button
- High test coverage. Most files have 100% coverage

### Interesting learnings

- I have not managed to win over the computer opponent while playing any single player modes
- Computer playing the move takes less than half a second. Making depth limited Minimax is unnecessary
- Commenting out [Alpha-Beta Pruning syntax](https://github.com/hiring-duckduckgo-com/david-yu/blob/main/src/TicTacToe/utils/miniMax.ts#L49) in Minimax implementation, the computation delay is noticable in wild variant, but not so much during standard gameplay
- Commenting out [Alpha-Beta Pruning syntax](https://github.com/hiring-duckduckgo-com/david-yu/blob/main/src/TicTacToe/utils/miniMax.ts#L49) in Minimax implementation, the overall test runs 10X slower, due to wild variant has many game state to evaluate
- I have used the snapshot test to conveniently visualize the end game state for each integration test. I have kept these [.snap files](https://github.com/hiring-duckduckgo-com/david-yu/tree/main/src/TicTacToe/integrations/__snapshots__) for review convenience, but the snapshots makes the test brittle. This can be easily turned off globally by commenting out the `renderGameStateSnapShot` function code
