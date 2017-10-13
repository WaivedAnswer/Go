interface IPlayer {
    canClickControl();
    name: string;
    teamId: TeamIds;
    score: number;
    passState: boolean;
    setNextMove(move: IMove);
    getNextMove();
    resetState();
}