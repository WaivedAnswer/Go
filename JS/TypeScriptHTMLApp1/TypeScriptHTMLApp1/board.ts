class Board {

    private values: Stone[][];
    height: number;
    width: number;
    constructor(height, width) {
        this.initialize(height, width);
        this.height = height;
        this.width = width;
    }

    initialize(height, width) {
        this.values = matrix(height, width, new Stone(TeamIds.None));
    }

    display() {
        const canvas = <HTMLCanvasElement> document.getElementById("board");
        var ctx = canvas.getContext("2d");
        var boardImgHeight = canvas.height*0.8;
        var boardImgWidth = canvas.width*0.8;
        var boardXOffset = (canvas.width - boardImgWidth) / 2.0;
        var boardYOffset = (canvas.height - boardImgHeight) / 2.0;

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(boardXOffset, boardYOffset, boardImgWidth, boardImgHeight);

        var stoneWidth = boardImgWidth / this.width;
        var stoneHeight = boardImgHeight / this.height;

        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                switch (this.values[i][j].teamId) {
                     case TeamIds.Black:
                     {
                         ctx.fillStyle = "rgb(0, 0, 0)";
                         break;
                     }
                     case TeamIds.White:
                     {
                         ctx.fillStyle = "rgb(255, 255, 255)";
                         break;
                     }
                     case TeamIds.None:
                     {
                         ctx.fillStyle = "rgba(0, 0, 0, 0)";
                         break;
                     }
                }

                ctx.fillRect(boardXOffset + j * stoneWidth, boardYOffset + i * stoneHeight, stoneWidth, stoneHeight);
            }
        }
    }

    isOccupied(x, y) {
        if (!this.isWithinBounds(x, y))
            return false;
        return this.values[x][y].teamId !== TeamIds.None;
    }

    isWithinBounds(x, y) {
        return (x <= this.width - 1 && x >= 0 && y <= this.height - 1 && y >= 0)
    }

    placeStone(x, y, stone) {
        if (this.isOccupied(x, y) || !this.isWithinBounds(x, y)) {
            return false;
        }
        else {
            this.values[x][y] = stone;
            return true;
        }
    }
}
