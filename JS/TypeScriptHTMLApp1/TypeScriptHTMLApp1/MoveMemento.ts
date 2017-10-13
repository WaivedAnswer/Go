class MoveMemento {
    scoreChange: number;
    placedStone: Stone;
    capturedStones: Array<Stone>;
    prevPassState: boolean;
    prevLastStone: Stone;
    prevLastCapturedStones: Array<Stone>;
}