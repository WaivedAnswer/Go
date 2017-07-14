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

    display(canvas) {
        var ctx = canvas.getContext("2d");
        var boardImgHeight = canvas.height;
        var boardImgWidth = canvas.width;
        var boardXOffset = 0.0;
        var boardYOffset = 0.0;

        ctx.fillStyle = 'rgb(222,184,135)';
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

    private isOccupied(x, y) {
        if (!this.isWithinBounds(x, y))
            return false;
        return this.values[y][x].teamId !== TeamIds.None;
    }

    private isWithinBounds(x, y) {
        return (x <= this.width - 1 && x >= 0 && y <= this.height - 1 && y >= 0)
    }

    //can be null
    getStone(x, y) {
        if (this.isWithinBounds(x, y)) {

            return this.values[y][x];
        } else {
            return null;
        }
    }

    private getAdjacentStones(stone) {
        const adjacentStones = new Array<Stone>();
        const leftStone = this.getStone(stone.x - 1, stone.y);
        const rightStone = this.getStone(stone.x + 1, stone.y);
        const aboveStone = this.getStone(stone.x, stone.y - 1);
        const belowStone = this.getStone(stone.x, stone.y + 1);

        if (leftStone != null) {
            adjacentStones.push(leftStone);
        }
        if (rightStone != null) {
            adjacentStones.push(rightStone);
        }
        if (aboveStone != null) {
            adjacentStones.push(aboveStone);
        }
        if (belowStone != null) {
            adjacentStones.push(belowStone);
        }

        return adjacentStones;
    }

    private getOpposingTeamId(teamID) {
        if (teamID === TeamIds.Black)
            return TeamIds.White;
        else if (teamID === TeamIds.White)
            return TeamIds.Black;
        else
            return TeamIds.None;
    }

    private getStonesForCapture(lastStone) {
        var capturedStones = new Array<Stone>();
        var adjStones = this.getAdjacentStones(lastStone);
        for (let adj of adjStones) {
            if (adj.teamId === this.getOpposingTeamId(lastStone.teamId)) {
                let adjGroup = new Array<Stone>();
                adjGroup.push(adj);
                this.findConnectedStones(adj, adjGroup);
                console.log("adjgroup is " + adjGroup.length + " long")

                if (!this.doesGroupHaveLiberties(adjGroup)) {
                    capturedStones = capturedStones.concat(adjGroup);
                    console.log(capturedStones.length, adjGroup.length)
                } else {
                    console.log("group is free!");
                }
            }
        }
        console.log("There are" + capturedStones.length + " stones to capture")
        return capturedStones;
    }

    private findConnectedStones(stone, group) {
        var adjStones = this.getAdjacentStones(stone);
        for (let adj of adjStones) {
            if (adj.teamId === stone.teamId && group.indexOf(adj) === -1) {
                group.push(adj);
                this.findConnectedStones(adj, group);
            }
        }
    }

    private isStoneConnected(stone) {
        const adjStones = this.getAdjacentStones(stone);
        for (let adj of adjStones) {
            if (adj.teamId === stone.teamID) {
                return true;
            }
        }
        return false;
    }

    private doesGroupHaveLiberties(group) {
        for (let stone of group) {
            if (this.doesStoneHaveLiberties(stone))
                return true;
        }
        return false;
    }

    private doesStoneHaveLiberties(stone) {
        const adjStones = this.getAdjacentStones(stone);
        for (let adj of adjStones) {
            if (adj.teamId === TeamIds.None) {
                return true;
            }
        }
        return false;
    }

    private removeStoneFromBoard(stone) {
        stone.teamId = TeamIds.None;
    }

    private removeGroupFromBoard(group) {
        console.log("removing " + group.length + " stones")
        for (let stone of group) {
            this.removeStoneFromBoard(stone);
        }
    }

    private updateBoardWithNewStone(x, y, stone) {

        stone.y = y;
        stone.x = x;
        this.values[y][x] = stone;

        let capturedStones = this.getStonesForCapture(stone);

        if (capturedStones.length > 0) {
            this.removeGroupFromBoard(capturedStones);
            console.log("Captured Stones! and Stone Placed:" + x + "," + y);
            return true;
        }
        var stoneGroup = new Array<Stone>();
        stoneGroup.push(stone);
        this.findConnectedStones(stone, stoneGroup);

        if (!this.doesGroupHaveLiberties(stoneGroup)) {
            console.log("Illegal Move, ko is suicidal")
            this.removeStoneFromBoard(stone);
            return false;
        }
        return true;
    }

    private isStonePlacementValid(x, y) {
        return (this.isOccupied(x, y) || !this.isWithinBounds(x, y));
    }

    placeStone(x, y, stone) {
        if (this.isStonePlacementValid(x, y)) {
            console.log("Invalid Placement:" + x + "," + y);
            return false;
        }
        return this.updateBoardWithNewStone(x, y, stone);

    }
}