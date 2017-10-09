class HumanPlayer implements IPlayer {

    SetNextMove(move: Move) {
        this.nextMove = move;
    }

    GetNextMove() {
        var nextMove = this.nextMove;
        this.nextMove = NullMove;
        return nextMove;
    }

    passState: boolean;

    CanClickControl() {
        return true;
    }

    teamId: TeamIds;
    score: number;
    nextMove: Move;

    constructor(teamId) {
        this.initialize(teamId);
    }

    initialize(teamId) {
        this.teamId = teamId;
        this.passState = false;
        this.nextMove = NullMove;
    }

}