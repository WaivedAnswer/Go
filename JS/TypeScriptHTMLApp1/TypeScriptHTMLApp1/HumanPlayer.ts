﻿class HumanPlayer implements IPlayer {


    ResetState() {
        this.score = 0;
        this.passState = false;
    }


    SetNextMove(move: Move) {
        this.nextMove = move;
    }

    GetNextMove() {
        var nextMove = this.nextMove;
        this.nextMove = new NullMove();
        return nextMove;
    }


    CanClickControl() {
        return true;
    }


    name: string;
    passState: boolean;
    teamId: TeamIds;
    score: number;
    nextMove: IMove;

    constructor(teamId, name) {
        this.initialize(teamId, name);
    }

    initialize(teamId, name) {
        this.teamId = teamId;
        this.passState = false;
        this.nextMove = new NullMove();
        this.score = 0;
        this.name = name;
    }

}