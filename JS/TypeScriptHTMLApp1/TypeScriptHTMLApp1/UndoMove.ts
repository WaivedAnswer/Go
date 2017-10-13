class UndoMove implements IMove {
    IsUndo() {
        return true;
    }

    player: IPlayer;
    Execute() {
        return true;
    }
    Undo() {
        throw new Error('Method not implemented.');
    }

}