class Greeter {
    element: HTMLElement;
    span: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "Play a game of Go! ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = "Click On the Board to Start";
    }


}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    var board = new Board(9, 9); 
    var boardContr = new BoardContainer(board);
    const canvas = document.getElementById("boardCanvas") as HTMLCanvasElement;
    var boardContr = new BoardContainer(canvas);
    boardContr.displayBoard();

    canvas.addEventListener("click", evt => {
        boardContr.clickBoard(evt);
        boardContr.displayBoard();
    });

    var bttn = document.getElementById("Button1");
    bttn.onclick = () => {
        boardContr.passMove();
    }   
    var bttn2 = document.getElementById("Button2");
    bttn2.onclick = () => {
        boardContr.resetGame();
    }   

};