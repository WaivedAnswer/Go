interface IPlayer {
    CanClickControl();
    teamId: TeamIds;
    score: number;
    passState: boolean;
    SetNextMove(move: Move);
    GetNextMove();
}