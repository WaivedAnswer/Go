interface IMove {
    player: IPlayer;

    Execute();
    Undo();
    IsUndo();
}