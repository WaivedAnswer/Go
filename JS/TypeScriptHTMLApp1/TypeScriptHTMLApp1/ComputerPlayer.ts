class ComputerPlayer implements IPlayer {
    setStrategy(strategy: IMoveStrategy) {
        this.moveStrategy = strategy;
    }

    teamId: TeamIds;
    score: number;
    passState: boolean;
    game: Game;
    name: string;
    moveStrategy: IMoveStrategy;

    isAi() {
        return true;
    }
    resetState() {
        this.score = 0;
        this.passState = false;
    }

    canClickControl() {
        return false;
    }

    constructor(teamId, game, name, strategy) {
        this.initialize(teamId, game, name, strategy);
    }

    initialize(teamId, game, name, strategy) {
        this.resetState();
        this.teamId = teamId;
        this.game = game;
        this.name = name;
        this.moveStrategy = strategy;
    }



    setNextMove(move: Move) {
        alert("Cannot set a Computer Player's next Move");
    }

    getNextMove() {
        return this.moveStrategy.chooseBestMove(this.game, this, this.game.getOpponent(this));
    }


}