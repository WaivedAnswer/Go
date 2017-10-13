class CaptureMoveStrategy implements IMoveStrategy {
    private evaluateBoard(game : Game) {
        const currentPlayer = game.getCurrentPlayer();
        const opponent = game.getOpponent(currentPlayer);

        return currentPlayer.score - opponent.score;
    }

    private minimax(depth, game, isMaximizingPlayer) {
        if (depth === 0) {
            if (isMaximizingPlayer) {
                return this.evaluateBoard(game);
            } else {
                return -this.evaluateBoard(game);
            }
        }

        const newGameMoves = game.getAvailableMoves(game.getCurrentPlayer());
        if (isMaximizingPlayer) {
            let bestMove = -9999;
            for (let i = 0; i < newGameMoves.length; i++) {
                game.makeMove(newGameMoves[i]);
                bestMove = Math.max(bestMove, this.minimax(depth - 1, game, false));
                game.undo();
            }
            return bestMove;
        } else {
            let bestMove = 9999;
            for (let i = 0; i < newGameMoves.length; i++) {
                game.makeMove(newGameMoves[i]);
                bestMove = Math.min(bestMove, this.minimax(depth - 1, game, true));
                game.undo();
            }
            return bestMove;
        }
    };

    chooseBestMove(game, currPlayer, opposingPlayer) {
        const depth = 2;
        game.setPreventEnd(true);
        const moves = game.getAvailableMoves(currPlayer);

        let bestMoves = new Array<Move>();
        let bestValue = -9999;

        for (let move of moves) {
            game.makeMove(move);
            const boardValue = this.minimax(depth, game, false);
            game.undo();
            if (boardValue === bestValue) {
                bestMoves.push(move);
            }
            else if (boardValue > bestValue) {
                bestValue = boardValue;
                bestMoves = new Array<Move>();
                bestMoves.push(move);
            } else {
                let value = boardValue;
            }
        }
        game.setPreventEnd(false);
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }
}