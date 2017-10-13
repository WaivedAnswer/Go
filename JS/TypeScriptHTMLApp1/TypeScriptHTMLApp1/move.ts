class Move {
    boardCoordX: number;
    boardCoordY: number;
    player: IPlayer;
    boardContainer: BoardContainer;

    constructor(boardCoordX, boardCoordY, player, boardContainer)
    {
        this.boardCoordX = boardCoordX;
        this.boardCoordY = boardCoordY;
        this.player = player;
        this.boardContainer = boardContainer;
    }

    Undo() {

    }
}

var NullMove = new Move(-1, -1, new NullPlayer(), new BoardContainer(null));
var PassMove = new Move(-2, -2, new NullPlayer(), new BoardContainer(null));
var UndoMove = new Move(-3, -3, new NullPlayer(), new BoardContainer(null));