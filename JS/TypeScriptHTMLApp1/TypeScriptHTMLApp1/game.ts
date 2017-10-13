class Game {

    private boardContainer: BoardContainer;
    private canvas: HTMLCanvasElement;
    private scoreBoardCanvas: HTMLCanvasElement;
    private player1: IPlayer;
    private player2: IPlayer;
    private currentPlayer: IPlayer;
    private moveStack: MoveStack;

    constructor(canvas) {
        this.initialize(canvas);
    }

    undo() {
        if (this.moveStack.isEmpty())
            return;
        const lastMove = this.moveStack.pop();
        lastMove.undo();
        this.switchPlayer();
    }


    private onMoveSuccess(move) {
        if (this.player1.passState && this.player2.passState) {
            this.onEndGame();
        }
        this.moveStack.push(move);
        this.switchPlayer();
    }

    makeMove(move) {
        if (move.execute()) {
            this.onMoveSuccess(move);
        }
    }

    process() {
        const nextMove = this.currentPlayer.getNextMove();
        this.makeMove(nextMove);
    }

    mainLoop = () => {
        this.process();
        this.display();
        requestAnimationFrame(this.mainLoop);
    }

    display() {
        this.boardContainer.displayBoard();
        this.displayScoreBoard();
    }

    private displayScoreBoard() {
        const ctx = this.scoreBoardCanvas.getContext("2d");
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, 200, 400);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(this.player1.name + " Score: " + this.player1.score, 8, 20);
        ctx.fillText(this.player2.name + " Score: " + this.player2.score, 8, 60);
    }

    private switchPlayer() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        }
        else {
            this.currentPlayer = this.player1;
        }
    }

    private handleBoardClick(evt) {
        if (!this.currentPlayer.canClickControl())
            return;
        this.currentPlayer.setNextMove(this.boardContainer.clickBoard(evt, this.currentPlayer));
    }

    private getWinner() {
        if (this.player1.score > this.player2.score)
            return this.player1.name;
        else if (this.player1.score === this.player2.score) {
            return "Nobody";
        }
        else {
            return this.player2.name;
        }
    }

    private onEndGame() {
        alert(`Game is completed, ${this.getWinner()} wins.`);
        this.boardContainer.isClickable = false;
    }

    private onReset() {
        this.moveStack = new MoveStack();
        this.player1.resetState();
        this.player2.resetState();
        this.currentPlayer = this.player1;
        this.boardContainer.resetGame();
    }

    private onPassClick() {
        if (!this.currentPlayer.canClickControl())
            return;
        this.currentPlayer.setNextMove(new PassMove(this.currentPlayer));
    }

    private onUndoClick() {
        if (!this.currentPlayer.canClickControl())
            return;
        this.undo();
    }

    private initialize(canvas) {
        this.canvas = canvas;
        this.boardContainer = new BoardContainer(this.canvas);
        this.moveStack = new MoveStack();

        this.scoreBoardCanvas = document.getElementById("scoreboardCanvas") as HTMLCanvasElement;

        canvas.addEventListener("click", evt => {
            this.handleBoardClick(evt);
        });

        const bttn = document.getElementById("Button1");
        bttn.onclick = () => {
            this.onPassClick();
        }
        const bttn2 = document.getElementById("Button2");
        bttn2.onclick = () => {
            this.onReset();
        }
        const bttn3 = document.getElementById("Button3");
        bttn3.onclick = () => {
            this.onUndoClick();
        }

        this.player1 = new HumanPlayer(TeamIds.White, "Bob");
        this.player2 = new HumanPlayer(TeamIds.Black, "Bob2");
        //this.Player2 = new ComputerPlayer(TeamIds.Black, this.boardContainer, "AlphaAlphaGo");
        this.currentPlayer = this.player1;
    }
}