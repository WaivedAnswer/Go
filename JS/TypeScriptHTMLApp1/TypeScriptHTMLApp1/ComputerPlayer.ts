class ComputerPlayer implements IPlayer {

    resetState() {
        this.score = 0;
        this.passState = false;
    }

    canClickControl() {
        return false;
    }

    constructor(teamId, boardContainer, name) {
        this.initialize(teamId, boardContainer, name);
    }

    initialize(teamId, boardContainer, name) {
        this.resetState();
        this.teamId = teamId;
        this.boardContainer = boardContainer;
        this.name = name;
    }

    teamId: TeamIds;
    score: number;
    passState: boolean;
    boardContainer: BoardContainer;
    name: string;


    setNextMove(move: Move) {
        console.log("Cannot set a Computer Player's next Move");
    }

    getNextMove() {
        const moves = this.boardContainer.getAvailableMoves(this);
        if (moves.length === 0) {
            return new PassMove(this);
        }
        return moves[Math.floor(Math.random() * moves.length)];
    }


}