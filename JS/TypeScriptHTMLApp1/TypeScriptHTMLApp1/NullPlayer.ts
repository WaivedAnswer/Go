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
    SetNextMove(move: IMove) {
    }
    GetNextMove() {
        return new NullMove();
    }
}
