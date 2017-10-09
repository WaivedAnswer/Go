class Move {
    boardCoordX: number;
    boardCoordY: number;
    teamId: TeamIds;

    constructor(boardCoordX, boardCoordY, teamId)
    {
        this.boardCoordX = boardCoordX;
        this.boardCoordY = boardCoordY;
        this.teamId = teamId;
    }


}

var NullMove = new Move(-1, -1, TeamIds.None);