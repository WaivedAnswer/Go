class MoveStack {

    private topNode: MoveNode = undefined;
    private count = 0;

    length(): number {
        return this.count;
    }

    isEmpty(): boolean {
        return this.topNode === undefined;
    }

    push(value: Move): void {
        // create a new Node and add it to the top
        const node = new MoveNode(value, this.topNode);
        this.topNode = node;
        this.count++;
    }

    pop(): Move {
        // remove the top node from the stack.
        // the node at the top now is the one before it
        const poppedNode = this.topNode;
        this.topNode = poppedNode.previous;
        this.count--;
        return poppedNode.data;
    }

    peek(): Move {
        return this.topNode.data;
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