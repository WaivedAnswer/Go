class Stone {

    teamId: TeamIds;
    private x: number;
    private y: number;

    constructor(teamId: TeamIds) {
        this.teamId = teamId;
    }

    setStoneCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    getStoneCoordinates() {
        return { x: this.x, y: this.y };
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