class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();

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