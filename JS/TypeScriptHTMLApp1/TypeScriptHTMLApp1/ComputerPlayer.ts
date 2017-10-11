class ComputerPlayer implements IPlayer
{
    CanClickControl() {
        return false;
    }

    constructor(teamId, boardContainer) {
        this.initialize(teamId,  boardContainer);
    }

    initialize(teamId, boardContainer) {
        this.teamId = teamId;
        this.passState = false;
        this.boardContainer = boardContainer;

    }

    teamId: TeamIds;
    score: number;
    passState: boolean;
    boardContainer: BoardContainer;

    SetNextMove(move: Move) {
        console.log("Cannot set a Computer Player's next Move");
    }

    GetNextMove() {
        var moves = this.boardContainer.getAvailableMoves(this);
        if (moves.length === 0)
        {
            return PassMove;
        }
        return moves[Math.floor(Math.random() * moves.length)];
    }


}