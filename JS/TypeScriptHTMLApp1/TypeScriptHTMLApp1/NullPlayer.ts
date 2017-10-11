class NullPlayer implements IPlayer {
    CanClickControl() {
        return false;
    }
    teamId: TeamIds;
    score: number;
    passState: boolean;
    SetNextMove(move: Move) {
    }
    GetNextMove() {
        return NullMove;
    }
}
