class Game {

    private boardContainer: BoardContainer;
    private canvas: HTMLCanvasElement;
    private scoreBoardCanvas: HTMLCanvasElement;
    private player1: IPlayer;
    private player2: IPlayer;
    private currentPlayer: IPlayer;
    private moveStack: MoveStack;
    private isGamePlayable: boolean;
    private currAiStrategy: IMoveStrategy;

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

    getAvailableMoves(player) {
        return this.boardContainer.getAvailableMoves(player);
    }

    makeMove(move) {
        if (move.execute()) {
            this.onMoveSuccess(move);
        }
    }

    process() {
        if (!this.isGamePlayable)
            return;
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

    getOpponent(player) {
        if (player === this.player1) {
            return this.player2;
        }
        return this.player1;
    }

    private switchPlayer() {
        this.currentPlayer = this.getOpponent(this.currentPlayer);
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
        this.isGamePlayable = false;
        this.boardContainer.isClickable = false;
    }

    private onReset() {
        this.isGamePlayable = true;
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

    private onDoubleUndoClick() {
        if (!this.currentPlayer.canClickControl())
            return;
        this.undo();
        this.undo();
    }

    onPlayer1AI() {
        if (!this.player1.isAi()) {
            this.player1 = new ComputerPlayer(TeamIds.White, this, "AlphaAlphaGo", this.currAiStrategy);
        } else {
            this.player1 = new HumanPlayer(TeamIds.White, "Bob");
        }
        this.onReset();
    }

    onPlayer2AI() {
        if (!this.player2.isAi()) {
            this.player2 = new ComputerPlayer(TeamIds.Black, this, "AlphaAlphaGo2", this.currAiStrategy);
        } else {
            this.player2 = new HumanPlayer(TeamIds.Black, "Bob2");
        }
        this.onReset();
    }

    private initialize(canvas) {
        this.isGamePlayable = true;
        this.canvas = canvas;
        this.boardContainer = new BoardContainer(this.canvas);
        this.moveStack = new MoveStack();
        this.currAiStrategy = new RandomMoveStrategy();
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

        const bttn4 = document.getElementById("Button4");
        bttn4.onclick = () => {
            this.onDoubleUndoClick();
        }
        const bttn5 = document.getElementById("Button5");
        bttn5.onclick = () => {
            this.onPlayer1AI();
        }
        const bttn6 = document.getElementById("Button6");
        bttn6.onclick = () => {
            this.onPlayer2AI();
        }

        const bttn7 = document.getElementById("Button7");
        bttn7.onclick = () => {
            this.onRandomAI();
        }

        const bttn8 = document.getElementById("Button8");
        bttn8.onclick = () => {
            this.onCaptureAI();
        }

        this.player1 = new HumanPlayer(TeamIds.White, "Bob");
        this.player2 = new ComputerPlayer(TeamIds.Black, this, "AlphaAlphaGo", new RandomMoveStrategy());
        this.currentPlayer = this.player1;
    }

    onRandomAI() {
        this.currAiStrategy = new RandomMoveStrategy();
        this.player1.setStrategy(this.currAiStrategy);
        this.player2.setStrategy(this.currAiStrategy);
    }

    onCaptureAI() {
        this.currAiStrategy = new CaptureMoveStrategy();
        this.player1.setStrategy(this.currAiStrategy);
        this.player2.setStrategy(this.currAiStrategy);
    }
}