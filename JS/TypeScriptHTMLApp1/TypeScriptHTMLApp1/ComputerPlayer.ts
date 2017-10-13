class ComputerPlayer implements IPlayer {

    ResetState() {
        this.score = 0;
        this.passState = false;
    }

    CanClickControl() {
        return false;
    }

    constructor(teamId, boardContainer, name) {
        this.initialize(teamId, boardContainer, name);
    }

    initialize(teamId, boardContainer, name) {
        this.ResetState();
        this.teamId = teamId;
        this.boardContainer = boardContainer;
        this.name = name;
    }

    teamId: TeamIds;
    score: number;
    passState: boolean;
    boardContainer: BoardContainer;
    name: string;


    SetNextMove(move: Move) {
        console.log("Cannot set a Computer Player's next Move");
    }

    GetNextMove() {
        var moves = this.boardContainer.getAvailableMoves(this);
        if (moves.length === 0) {
            return new PassMove(this);
        }
        return moves[Math.floor(Math.random() * moves.length)];
    }


}