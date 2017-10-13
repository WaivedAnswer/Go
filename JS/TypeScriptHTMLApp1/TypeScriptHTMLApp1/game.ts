class Game {

    private boardContainer: BoardContainer;
    private canvas: HTMLCanvasElement;
    private scoreBoardCanvas: HTMLCanvasElement;
    private Player1: IPlayer;
    private Player2: IPlayer;
    private CurrentPlayer: IPlayer;
    private moveFailureCount: number;
    private moveStack: MoveStack;

    constructor(canvas) {
        this.initialize(canvas);
    }

    private OnUndo() {
        if (this.moveStack.isEmpty())
            return;
        var lastMove = this.moveStack.pop();
        lastMove.Undo();
        this.SwitchPlayer();
    }

    private OnMoveFailure() {
        this.moveFailureCount++;
        if (this.moveFailureCount > 3) {
            this.moveFailureCount = 0;
            this.OnPass();
        }
    }

    private OnMoveSuccess() {
        this.CurrentPlayer.passState = false;
        this.moveFailureCount = 0;
        this.SwitchPlayer();
    }

    public makeMove(move) {
        if (move == PassMove) {
            this.OnPass();
            this.moveStack.push(move);
        }
        else if (move == UndoMove) {
            this.OnUndo();
        }
        else if (this.boardContainer.placeStone(move)) {
            this.OnMoveSuccess();
            this.moveStack.push(move);
        }
        else {
            alert("Shouldn't here");
            this.OnMoveFailure();
        }
    }

    public process() {
        var nextMove = this.CurrentPlayer.GetNextMove();
        if (nextMove !== NullMove) {
            this.makeMove(nextMove);
        }
    }

    public mainLoop = () => {
        this.process();
        this.display();
        requestAnimationFrame(this.mainLoop);
    }

    public display() {
        this.boardContainer.displayBoard();
        this.displayScoreBoard();
    }

    private displayScoreBoard() {
        var ctx = this.scoreBoardCanvas.getContext("2d");
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(0, 0, 200, 400);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(this.Player1.name + " Score: " + this.Player1.score, 8, 20);
        ctx.fillText(this.Player2.name + " Score: " + this.Player2.score, 8, 60)
    }

    private SwitchPlayer() {
        if (this.CurrentPlayer === this.Player1) {
            this.CurrentPlayer = this.Player2;
        }
        else {
            this.CurrentPlayer = this.Player1;
        }
    }

    private HandleBoardClick(evt) {
        if (!this.CurrentPlayer.CanClickControl())
            return;
        this.CurrentPlayer.SetNextMove(this.boardContainer.clickBoard(evt, this.CurrentPlayer));
    }

    private OnPass() {
        this.moveFailureCount = 0;
        this.CurrentPlayer.passState = true;
        this.SwitchPlayer();
        if (this.Player1.passState && this.Player2.passState) {
            this.OnEndGame();
        }
    }

    private GetWinner() {
        if (this.Player1.score > this.Player2.score)
            return this.Player1.name;
        else if (this.Player1.score === this.Player2.score) {
            return "Nobody";
        }
        else {
            return this.Player2.name;
        }
    }

    private OnEndGame() {
        alert("Game is completed, " + this.GetWinner() + " wins.");
        this.boardContainer.isClickable = false;
    }

    private OnReset() {
        this.moveStack = new MoveStack();
        this.Player1.ResetState();
        this.Player2.ResetState();
        this.CurrentPlayer = this.Player1;
        this.moveFailureCount = 0;
        this.boardContainer.resetGame();
    }

    private OnPassClick() {
        if (!this.CurrentPlayer.CanClickControl())
            return;
        this.CurrentPlayer.SetNextMove(PassMove);
    }

    private OnUndoClick() {
        if (!this.CurrentPlayer.CanClickControl())
            return;
        this.CurrentPlayer.SetNextMove(UndoMove);
    }

    private initialize(canvas) {
        this.moveFailureCount = 0;
        this.canvas = canvas;
        this.boardContainer = new BoardContainer(this.canvas);
        this.moveStack = new MoveStack();

        this.scoreBoardCanvas = document.getElementById("scoreboardCanvas") as HTMLCanvasElement;

        canvas.addEventListener("click", evt => {
            this.HandleBoardClick(evt);
        });

        var bttn = document.getElementById("Button1");
        bttn.onclick = () => {
            this.OnPassClick();
        }
        var bttn2 = document.getElementById("Button2");
        bttn2.onclick = () => {
            this.OnReset();
        }
        var bttn2 = document.getElementById("Button3");
        bttn2.onclick = () => {
            this.OnUndo();
        }

        this.Player1 = new HumanPlayer(TeamIds.White, "Bob");
        this.Player2 = new ComputerPlayer(TeamIds.Black, this.boardContainer, "AlphaAlphaGo");
        this.CurrentPlayer = this.Player1;
    }
}