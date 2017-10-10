class BoardContainer {

    private board: Board;
    private currStone: Stone;
    private passCount: number;
    private canvas: HTMLCanvasElement;
    isClickable: boolean;

    constructor(canvas) {
        this.canvas = canvas;
        this.resetBoardContainer();
    }

    private resetBoardContainer() {
        this.board = new Board(9, 9); 
        this.currStone = new Stone(TeamIds.Black);
        this.passCount = 0;
        this.isClickable = true;
    }

    private getCanvasMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    private getBoardCoordinateFromCanvasCoordinates(pos, canvas) {
        var boardHeight = this.board.height;
        var boardWidth = this.board.width;
        var heightRatio = canvas.height / boardHeight;
        var widthRatio = canvas.width / boardWidth;
        return {
            x: Math.floor(pos.x / widthRatio),
            y: Math.floor(pos.y / heightRatio)
        };
    }

    displayBoard() {
        this.board.display(this.canvas);
    }

    placeStone(move) {
        return this.board.placeStone(move.boardCoordX, move.boardCoordY, new Stone(move.teamId));
    }


    getAvailableMoves(currPlayer) {
        return this.board.getAvailableMoves(currPlayer.teamId);
    }


    clickBoard(evt, currPlayer) {
        if (!this.isClickable)
            return NullMove;
        var pos = this.getCanvasMousePos(this.canvas, evt);
        var boardCoord = this.getBoardCoordinateFromCanvasCoordinates(pos, this.canvas);
        if (this.board.canPlaceStone(boardCoord.x, boardCoord.y)) {
            return new Move(boardCoord.x, boardCoord.y, currPlayer.teamId);
        }         
        return NullMove;
    }

    resetGame() {
        this.resetBoardContainer();
        this.displayBoard();
    }
}