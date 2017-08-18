class BoardContainer {

    private board: Board;
    private currStone: Stone;
    private passCount: number;
    private canvas: HTMLCanvasElement;
    private isClickable: boolean;

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

    clickBoard(evt) {
        if (!this.isClickable)
            return;
        var pos = this.getCanvasMousePos(this.canvas, evt);
        var boardCoord = this.getBoardCoordinateFromCanvasCoordinates(pos, this.canvas);
        if (this.board.placeStone(boardCoord.x, boardCoord.y, this.currStone)) {
            this.passCount = 0;
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

    passMove() {
        this.passCount++;
        if (this.passCount === 2) {
            alert("Game is completed, both players passed.");
            this.isClickable = false;
        }

        switch (this.currStone.teamId) {
        case TeamIds.Black:
            this.currStone = new Stone(TeamIds.White);
            break;
        case TeamIds.White:
        default:
            this.currStone = new Stone(TeamIds.Black);
            break;
        }
    }

    resetGame() {
        this.resetBoardContainer();
        this.displayBoard();
    }
}