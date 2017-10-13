class NullPlayer implements IPlayer {

    name: string;

    resetState() {
    }

    canClickControl() {
        return false;
    }
    teamId: TeamIds;
    score: number;
    passState: boolean;
    setNextMove(move: IMove) {
    }
    getNextMove() {
        return new NullMove();
    }
}
