interface IPlayer {
    CanClickControl();
    teamId: TeamIds;
    score: number;
    passState: boolean;
}