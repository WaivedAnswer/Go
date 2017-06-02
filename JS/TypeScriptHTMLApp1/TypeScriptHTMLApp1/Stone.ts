class Stone {

    teamId: TeamIds;

    constructor(teamId: TeamIds) {
        this.teamId = teamId;
    }

    display() {
        return this.teamId;
    }

}

enum TeamIds {
    None,
    Black,
    White
}