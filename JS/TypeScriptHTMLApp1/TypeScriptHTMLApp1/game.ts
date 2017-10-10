class Game {
    
    private boardContainer: BoardContainer;
    private canvas: HTMLCanvasElement;
    private Player1: IPlayer;
    private Player2: IPlayer;
    private CurrentPlayer: IPlayer;
    private moveFailureCount: number;

    constructor(canvas) {
        this.initialize(canvas);
    }

    public process() {
        var nextMove = this.CurrentPlayer.GetNextMove();
        if (nextMove !== NullMove) {
            if (this.boardContainer.placeStone(nextMove)) {
                this.CurrentPlayer.passState = false;
                this.moveFailureCount = 0;
                this.SwitchPlayer();
            }
            else {
                this.moveFailureCount++;
                if (this.moveFailureCount > 5)
                {
                    this.CurrentPlayer.passState = true;
                    this.SwitchPlayer();
                }
            }
        }
            
    }

    public mainLoop = () => {
        this.process();
        this.boardContainer.displayBoard();
        requestAnimationFrame(this.mainLoop);
    }

    public display() {
        this.boardContainer.displayBoard();
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
        this.CurrentPlayer = this.Player1;
        this.moveFailureCount = 0;
        this.boardContainer.resetGame();
    }

    private initialize(canvas)
    {
        this.moveFailureCount = 0;
        this.canvas = canvas;
        this.boardContainer = new BoardContainer(this.canvas);

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

        this.Player1 = new HumanPlayer(TeamIds.White);
        this.Player2 = new ComputerPlayer(TeamIds.Black, this.boardContainer);
        this.CurrentPlayer = this.Player1;
    }
}