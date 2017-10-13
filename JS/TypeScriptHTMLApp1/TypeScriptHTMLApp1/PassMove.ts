class PassMove implements IMove {
    IsUndo() {
        return false;
    }

    player: IPlayer;

    constructor (player){
        this.player = player;
    }
    Execute() {
        this.player.passState = true;
        return true;
    }
    Undo() {
        this.player.passState = false;
    }

}