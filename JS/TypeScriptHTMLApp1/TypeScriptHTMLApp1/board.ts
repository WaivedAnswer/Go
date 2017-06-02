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
        var displayString = "";
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                displayString += this.values[i][j].display();
            }
            displayString += "\n";
        }
        console.log(displayString);
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
