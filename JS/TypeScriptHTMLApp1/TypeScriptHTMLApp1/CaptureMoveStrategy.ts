class CaptureMoveStrategy implements IMoveStrategy {
    private evaluateBoard(game) {
        return 0.0;
    }

    private minimax (depth, game, isMaximizingPlayer) {
        if (depth === 0) {
            return -this.evaluateBoard(game);
        }
        const newGameMoves = game.getAvailableMoves(isMaximizingPlayer);
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
        const depth = 4;
        const moves = game.getAvailableMoves(currPlayer);

        let bestMove = new PassMove(currPlayer);
        let bestValue = -9999;

        for (let move of moves) {
            game.makeMove(move);
            const boardValue = -this.minimax(depth, game, false);
            game.undo();
            if (boardValue > bestValue) {
                bestValue = boardValue;
                bestMove = move;
            }
        }
        return bestMove;
    }
}