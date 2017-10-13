interface IPlayer {
    CanClickControl();
    name: string;
    teamId: TeamIds;
    score: number;
    passState: boolean;
    SetNextMove(move: IMove);
    GetNextMove();
    ResetState();
}