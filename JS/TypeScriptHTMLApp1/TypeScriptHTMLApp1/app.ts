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

    const canvas = document.getElementById("boardCanvas") as HTMLCanvasElement;
    var game = new Game(canvas);
    game.display();
    requestAnimationFrame(game.mainLoop);
};