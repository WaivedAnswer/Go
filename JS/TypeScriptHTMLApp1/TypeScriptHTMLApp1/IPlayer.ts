interface IPlayer {
    isAi();
    canClickControl();
    name: string;
    teamId: TeamIds;
    score: number;
    passState: boolean;
    setNextMove(move: IMove);
    setStrategy(strategy: IMoveStrategy);
    getNextMove();
    resetState();
}