function matrix (numRows : number, numCols: number, initial: any) {
    const multi = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        multi[i] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            multi[i][j] = initial;
        }
    }
    return multi;
}