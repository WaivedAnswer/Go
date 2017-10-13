class NullMove implements IMove {

    player: IPlayer;
    execute() {
        return false;
    }
    undo() {
    }

}