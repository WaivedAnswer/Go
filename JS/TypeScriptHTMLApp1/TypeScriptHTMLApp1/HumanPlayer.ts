class HumanPlayer implements IPlayer {
    passState: boolean;

    CanClickControl() {
        return true;
    }

    teamId: TeamIds;
    score: number;

    constructor(teamId) {
        this.initialize(teamId);
    }

    initialize(teamId) {
        this.teamId = teamId;
        this.passState = false;
    }

}