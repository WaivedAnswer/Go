class ComputerPlayer implements IPlayer {

    resetState() {
        this.score = 0;
        this.passState = false;
    }

    canClickControl() {
        return false;
    }

    constructor(teamId, game, name) {
        this.initialize(teamId, game, name);
    }

    initialize(teamId, game, name) {
        this.resetState();
        this.teamId = teamId;
        this.game = game;
        this.name = name;
    }

    teamId: TeamIds;
    score: number;
    passState: boolean;
    game: Game;
    name: string;


    setNextMove(move: Move) {
        console.log("Cannot set a Computer Player's next Move");
    }

    getNextMove() {
        const moves = this.game.getAvailableMoves(this);
        if (moves.length === 0) {
            return new PassMove(this);
        }
        return moves[Math.floor(Math.random() * moves.length)];
    }


}