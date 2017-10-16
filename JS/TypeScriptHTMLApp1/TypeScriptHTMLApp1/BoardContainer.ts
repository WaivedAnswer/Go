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
        this.board = new Board(ContainerBoardHeight, ContainerBoardWidth);
        this.currStone = new Stone(TeamIds.Black);
        this.passCount = 0;
        this.isClickable = true;
    }

    private getCanvasMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
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

    resetStone(stone) {
        const coords = stone.getStoneCoordinates();

        this.board.setStone(coords.x, coords.y, TeamIds.None);
    }

    playMove(move) {
        const originalScore = move.player.score;
        move.memento.prevLastStone = this.board.lastStone;
        move.memento.prevLastCapturedStones = this.board.lastCapturedStones;
        if (this.board.playMove(move)) {
            move.memento.placedStone = this.board.lastStone;
            move.memento.capturedStones = this.board.lastCapturedStones;
            move.memento.scoreChange = move.player.score - originalScore;
            return true;
        }
        return false;
    }

    setLastStone(lastStone) {
        this.board.lastStone = lastStone;
    }

    setLastCapturedStones(lastCapturedStones) {
        this.board.lastCapturedStones = lastCapturedStones;
    }

    setStone(x, y, teamId) {
        return this.board.setStone(x, y, teamId);
    }

    getAvailableMoves(currPlayer : IPlayer) {
        
        const moveList = [];
        moveList.push(new PassMove(currPlayer));
        for (let i = 0; i < this.board.height; i++) {
            for (let j = 0; j < this.board.width; j++) {
                if (this.board.canPlaceStone(i, j, currPlayer.teamId, false)) {
                    moveList.push(new Move(i, j, currPlayer, this));
                }
            }
        }
        return moveList;
    }


    clickBoard(evt, currPlayer : IPlayer) {
        if (!this.isClickable)
            return new NullMove();
        const pos = this.getCanvasMousePos(this.canvas, evt);
        const boardCoord = this.getBoardCoordinateFromCanvasCoordinates(pos, this.canvas);
        if (this.board.canPlaceStone(boardCoord.x, boardCoord.y, currPlayer.teamId, true)) {
            return new Move(boardCoord.x, boardCoord.y, currPlayer, this);
        }         
        return new NullMove();
    }

    resetGame() {
        this.resetBoardContainer();
        this.displayBoard();
    }
}

var ContainerBoardHeight = 6;
var ContainerBoardWidth = 6;