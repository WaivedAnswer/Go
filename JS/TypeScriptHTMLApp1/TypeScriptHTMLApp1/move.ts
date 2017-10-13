class Move implements IMove {
    IsUndo() {
        return false;
    }

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

    Execute() {
        if (this.boardContainer.placeStone(this)) {
            this.player.passState = false;
            return true;
        }
        return false;
    }

    Undo() {

    }
}