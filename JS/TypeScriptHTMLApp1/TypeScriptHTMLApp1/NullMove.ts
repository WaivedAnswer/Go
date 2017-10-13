class NullMove implements IMove {
    IsUndo() {
        return false;
    }

    player: IPlayer;
    Execute() {
        return false;
    }
    Undo() {
    }

}