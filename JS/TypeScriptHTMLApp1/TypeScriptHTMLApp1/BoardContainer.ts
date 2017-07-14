class BoardContainer {

    private board: Board;
    private currStone: Stone;
    constructor(board) {
        this.board = board;
        this.currStone = new Stone(TeamIds.Black);
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

    clickBoard(canvas, evt) {
        var pos = this.getCanvasMousePos(canvas, evt);
        var boardCoord = this.getBoardCoordinateFromCanvasCoordinates(pos, canvas);
        if (this.board.placeStone(boardCoord.x, boardCoord.y, this.currStone)) {
            switch (this.currStone.teamId) {
                case TeamIds.Black:
                    this.currStone = new Stone(TeamIds.White);
                    break;
                case TeamIds.White:
                default :
                    this.currStone = new Stone(TeamIds.Black);
                    break;

            }
        }
            
            
    }
}