class HumanPlayer implements IPlayer {


    resetState() {
        this.score = 0;
        this.passState = false;
    }


    setNextMove(move: Move) {
        this.nextMove = move;
    }

    getNextMove() {
        const nextMove = this.nextMove;
        this.nextMove = new NullMove();
        return nextMove;
    }


    canClickControl() {
        return true;
    }


    name: string;
    passState: boolean;
    teamId: TeamIds;
    score: number;
    nextMove: IMove;

    constructor(teamId, name) {
        this.initialize(teamId, name);
    }

    initialize(teamId, name) {
        this.teamId = teamId;
        this.passState = false;
        this.nextMove = new NullMove();
        this.score = 0;
        this.name = name;
    }

}