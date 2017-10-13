class Board {

    private values: Stone[][];
    height: number;
    width: number;
    lastStone: Stone;
    lastCapturedStones: Array<Stone>;

    constructor(height, width) {
        this.initialize(height, width);
    }

    initialize(height, width) {
        this.values = matrix(height, width, new Stone(TeamIds.None));
        this.height = height;
        this.width = width;
        this.lastStone = null;
        this.lastCapturedStones = new Array<Stone>();
    }

    private drawBoard(ctx, offX, offY, height, width) {
        ctx.fillStyle = 'rgb(222,184,135)';
        ctx.fillRect(offX, offY, width, height);
    }

    private drawGridLines(ctx, offX, offY, stoneWidth, stoneHeight) {
        //horizontal lines
        for (let j = 0; j < this.height; j++) {
            ctx.moveTo(offX + 0.5 * stoneWidth, offY + (j + 0.5) * stoneHeight);
            ctx.lineTo(offX + (this.width - 0.5) * stoneWidth, offY + (j + 0.5) * stoneHeight);
        }

        //vertical lines
        for (let i = 0; i < this.width; i++) {
            ctx.moveTo(offX + (i + 0.5) * stoneWidth, offY + 0.5 * stoneHeight);
            ctx.lineTo(offX + (i + 0.5) * stoneWidth, offY + (this.height - 0.5)*stoneHeight );
        }



        ctx.strokestyle = "rgb(255, 255, 255)";
        ctx.stroke();
    }

    private drawStones(ctx, offX, offY, stoneWidth, stoneHeight) {
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

                ctx.fillRect(offX + j * stoneWidth, offY + i * stoneHeight, stoneWidth, stoneHeight);
            }
        }
    }

    display(canvas) {
        var ctx = canvas.getContext("2d");
        var boardImgHeight = canvas.height;
        var boardImgWidth = canvas.width;
        var boardXOffset = 0.0;
        var boardYOffset = 0.0;

        this.drawBoard(ctx, boardXOffset, boardYOffset, boardImgHeight, boardImgWidth);
        
        var stoneWidth = boardImgWidth / this.width;
        var stoneHeight = boardImgHeight / this.height;

        this.drawGridLines(ctx, boardXOffset, boardYOffset, stoneWidth, stoneHeight);
        this.drawStones(ctx, boardXOffset, boardYOffset, stoneWidth, stoneHeight);
        
     
    }

    private isOccupied(x, y) {
        if (!this.isWithinBounds(x, y))
            return false;
        return this.values[y][x].teamId !== TeamIds.None;
    }

    private isWithinBounds(x, y) {
        return (x <= this.width - 1 && x >= 0 && y <= this.height - 1 && y >= 0);
    }

    //can be null
    private getStone(x, y) {
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

    private getOpposingTeamId(teamId) {
        if (teamId === TeamIds.Black)
            return TeamIds.White;
        else if (teamId === TeamIds.White)
            return TeamIds.Black;
        else
            return TeamIds.None;
    }

    private getStonesForCapture(lastStone) {
        let capturedStones = new Array<Stone>();
        const adjStones = this.getAdjacentStones(lastStone);
        for (let adj of adjStones) {
            if (adj.teamId === this.getOpposingTeamId(lastStone.teamId) && !capturedStones.some(x=>x===adj)) {
                const adjGroup = new Array<Stone>();
                adjGroup.push(adj);
                this.findConnectedStones(adj, adjGroup);

                if (!this.doesGroupHaveLiberties(adjGroup)) {
                    capturedStones = capturedStones.concat(adjGroup);
                }
            }
        }
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

    removeStoneFromBoard(stone) {
        stone.teamId = TeamIds.None;
    }

    private removeGroupFromBoard(group) {
        for (let stone of group) {
            this.removeStoneFromBoard(stone);
        }
    }

    private isIllegalKoMove(capturedStones) {
        if (this.lastCapturedStones.length !== 1 || capturedStones.length !== 1 || capturedStones[0] !== this.lastStone)
            return false;
        return true;
    }
    private updateBoardWithMove(move) {
        const newStone = new Stone(move.player.teamId);

        newStone.setStoneCoordinates(move.boardCoordX, move.boardCoordY);

        this.values[move.boardCoordY][move.boardCoordX] = newStone;

        const capturedStones = this.getStonesForCapture(newStone);

        if (capturedStones.length > 0) {
            if (this.isIllegalKoMove(capturedStones)) {
                this.removeStoneFromBoard(newStone);
                return false;
            } else {
                this.removeGroupFromBoard(capturedStones);
                this.lastCapturedStones = capturedStones;
                move.player.score += this.lastCapturedStones.length;
                this.lastStone = newStone;
                return true;
            }
        }

        const stoneGroup = new Array<Stone>();
        stoneGroup.push(newStone);
        this.findConnectedStones(newStone, stoneGroup);

        if (!this.doesGroupHaveLiberties(stoneGroup)) {
            this.removeStoneFromBoard(newStone);
            return false;
        }
        this.lastCapturedStones = capturedStones;
        this.lastStone = newStone;
        return true;
    }

    private isStonePlacementInvalid(x, y) {
        return (this.isOccupied(x, y) || !this.isWithinBounds(x, y));
    }

    isIllegalMove(x, y, teamId, shouldNotify){
        const newStone = new Stone(teamId);

        newStone.setStoneCoordinates(x, y);
        const oldStone = this.values[y][x];
        this.values[y][x] = newStone;

        const capturedStones = this.getStonesForCapture(newStone);

        if (capturedStones.length > 0) {
            if (this.isIllegalKoMove(capturedStones)) {
                //illegal ko
                if (shouldNotify) {
                    alert("Illegal Ko Move");
                }
                this.values[y][x] = oldStone;
                return true;
            }
            this.values[y][x] = oldStone;
            return false;
         }

        const stoneGroup = new Array<Stone>();
        stoneGroup.push(newStone);
        this.findConnectedStones(newStone, stoneGroup);

        if (!this.doesGroupHaveLiberties(stoneGroup)) {
            //illegal suicidal
            if (shouldNotify) {
                alert("Illegal Move: Move is suicidal");
            }
            this.values[y][x] = oldStone;
            return true;
        }
        this.values[y][x] = oldStone;
        return false;
    }

    canPlaceStone(x, y, teamId, shouldNotify) {
        if (this.isStonePlacementInvalid(x, y) || this.isIllegalMove(x, y, teamId, shouldNotify)) {
            return false;
        }
        return true;
    }

    playMove(move) {
        if (this.isStonePlacementInvalid(move.boardCoordX, move.boardCoordY)) {
            return false;
        }
        return this.updateBoardWithMove(move);

    }

    setStone(x, y, teamId) {
        this.values[y][x].teamId = teamId;
    }
}