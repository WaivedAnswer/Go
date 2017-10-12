class Game {
    
    private boardContainer: BoardContainer;
    private canvas: HTMLCanvasElement;
    private scoreBoardCanvas: HTMLCanvasElement;
    private Player1: IPlayer;
    private Player2: IPlayer;
    private CurrentPlayer: IPlayer;
    private moveFailureCount: number;

    constructor(canvas) {
        this.initialize(canvas);
    }


    public makeMove(move) {
        if (move == PassMove)
        {
            this.OnPass();
        }
        else if (this.boardContainer.placeStone(move)) {
            this.CurrentPlayer.passState = false;
            this.moveFailureCount = 0;
            this.SwitchPlayer();
        }
        else {
            this.moveFailureCount++;
            if (this.moveFailureCount > 3) {
                this.CurrentPlayer.passState = true;
                this.SwitchPlayer();
            }
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
        this.CurrentPlayer.passState = true;
        this.SwitchPlayer();
        if (this.Player1.passState && this.Player2.passState) {
            alert("Game is completed, both players passed.");
            this.boardContainer.isClickable = false;
        }
    }

    private OnReset() {
        this.Player1.ResetState();
        this.Player2.ResetState();
        this.CurrentPlayer = this.Player1;
        this.moveFailureCount = 0;
        this.boardContainer.resetGame();
    }

    private initialize(canvas)
    {
        this.moveFailureCount = 0;
        this.canvas = canvas;
        this.boardContainer = new BoardContainer(this.canvas);

        this.scoreBoardCanvas = document.getElementById("scoreboardCanvas") as HTMLCanvasElement;

        canvas.addEventListener("click", evt => {
            this.HandleBoardClick(evt);
        });

        var bttn = document.getElementById("Button1");
        bttn.onclick = () => {
            this.OnPass();
        }
        var bttn2 = document.getElementById("Button2");
        bttn2.onclick = () => {
            this.OnReset();
        }

        this.Player1 = new HumanPlayer(TeamIds.White, "Bob");
        this.Player2 = new ComputerPlayer(TeamIds.Black, this.boardContainer, "AlphaAlphaGo");
        this.CurrentPlayer = this.Player1;
    }
}