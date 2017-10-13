class MoveStack {

    private _topNode: MoveNode = undefined;
    private _count: number = 0;

    public count(): number {
        return this._count;
    }

    public isEmpty(): boolean {
        return this._topNode === undefined;
    }

    public push(value: Move): void {
        // create a new Node and add it to the top
        let node = new MoveNode(value, this._topNode);
        this._topNode = node;
        this._count++;
    }

    public pop(): Move {
        // remove the top node from the stack.
        // the node at the top now is the one before it
        let poppedNode = this._topNode;
        this._topNode = poppedNode.previous;
        this._count--;
        return poppedNode.data;
    }

    public peek(): Move {
        return this._topNode.data;
    }

}

class MoveNode {
    previous: MoveNode;
    data: Move;

    constructor(data: Move, previous: MoveNode) {
        this.previous = previous;
        this.data = data;
    }
}