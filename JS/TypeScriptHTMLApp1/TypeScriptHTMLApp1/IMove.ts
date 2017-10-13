interface IMove {
    player: IPlayer;

    execute();
    undo();
}