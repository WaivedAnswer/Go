class RandomMoveStrategy implements IMoveStrategy {
    chooseBestMove(game, currPlayer, opposingPlayer) {
        const moves = game.getAvailableMoves(currPlayer);
        if (moves.length === 0)
            return new PassMove(currPlayer);
        return moves[Math.floor(Math.random() * moves.length)];
    }

}