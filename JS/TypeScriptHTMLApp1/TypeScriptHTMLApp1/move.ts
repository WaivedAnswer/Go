class Move implements IMove {

    boardCoordX: number;
    boardCoordY: number;
    player: IPlayer;
    boardContainer: BoardContainer;
    memento: MoveMemento;

    constructor(boardCoordX, boardCoordY, player, boardContainer)
    {
        this.boardCoordX = boardCoordX;
        this.boardCoordY = boardCoordY;
        this.player = player;
        this.boardContainer = boardContainer;
        this.memento = new MoveMemento();
    }

    execute() {
        this.memento.prevPassState = this.player.passState;
        if (this.boardContainer.playMove(this)) {
            this.player.passState = false;
            return true;
        }
        return false;
    }

    private getOpposingTeamId(teamId) {
        if (teamId === TeamIds.Black)
            return TeamIds.White;
        else if (teamId === TeamIds.White)
            return TeamIds.Black;
        else
            return TeamIds.None;
    }

    undo() {
        const otherTeam = this.getOpposingTeamId(this.player.teamId);
        this.boardContainer.resetStone(this.memento.placedStone);
        for (let i = 0; i < this.memento.capturedStones.length; i++) {
            const currStone = this.memento.capturedStones[i];
            const coords = currStone.getStoneCoordinates();
            this.boardContainer.setStone(coords.x, coords.y, otherTeam);
        }
        this.boardContainer.setLastStone(this.memento.prevLastStone);
        this.boardContainer.setLastCapturedStones(this.memento.prevLastCapturedStones);
        this.player.score -= this.memento.scoreChange;
        this.player.passState = this.memento.prevPassState;
    }
}