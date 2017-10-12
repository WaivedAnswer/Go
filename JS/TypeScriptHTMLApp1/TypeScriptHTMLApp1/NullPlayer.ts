class NullPlayer implements IPlayer {

    name: string;

    ResetState() {
    }

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
