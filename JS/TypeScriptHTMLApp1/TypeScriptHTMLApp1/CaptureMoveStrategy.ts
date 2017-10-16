class CaptureMoveStrategy implements IMoveStrategy {
    private evaluateBoard(game: Game) {
        const currentPlayer = game.getCurrentPlayer();
        const opponent = game.getOpponent(currentPlayer);
        return currentPlayer.score - opponent.score;
    }

    private minimax(depth, game) {
        if (depth === 0) {
            return this.evaluateBoard(game);
        }

        const newGameMoves = game.getAvailableMoves(game.getCurrentPlayer());
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.makeMove(newGameMoves[i]);
            bestMove = Math.max(bestMove, -this.minimax(depth - 1, game));
            game.undo();
        }
        return bestMove;
    };

    chooseBestMove(game, currPlayer, opposingPlayer) {
        const depth = 3;
        game.setPreventEnd(true);
        const moves = game.getAvailableMoves(currPlayer);

        let bestMoves = new Array<IMove>();
        let bestValue = -9999;

        for (let move of moves) {
            game.makeMove(move);
            const boardValue = -this.minimax(depth, game);
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
        if (bestMoves.length === 0)
        {
            return new PassMove(currPlayer);
        }
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }
}