class Move {
    boardCoordX: number;
    boardCoordY: number;
    player: IPlayer;

    constructor(boardCoordX, boardCoordY, player)
    {
        this.boardCoordX = boardCoordX;
        this.boardCoordY = boardCoordY;
        this.player = player;
    }


}

var NullMove = new Move(-1, -1, new NullPlayer());
var PassMove = new Move(-2, -2, new NullPlayer());