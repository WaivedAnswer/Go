class PassMove implements IMove {

    player: IPlayer;
    moveMemento: MoveMemento;
    constructor (player){
        this.player = player;
        this.moveMemento = new MoveMemento();
    }
    execute() {
        this.moveMemento.prevPassState = this.player.passState;
        this.player.passState = true;
        return true;
    }
    undo() {
        this.player.passState = this.moveMemento.prevPassState;
    }

}