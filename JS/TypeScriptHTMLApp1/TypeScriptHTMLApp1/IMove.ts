interface IMove {
    player: IPlayer;
    boardContainer: Game;

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