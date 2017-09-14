import { ConfigController } from './config';
import { Node } from './node';
import * as Immutable from 'immutable';
import * as _ from 'lodash';

function getDiagonalNeighbors<T extends Node, V>(grid: Immutable.Map<T, V>) {
    const gridToValidateAgainst = grid;
   
    return (x: number, y: number): Set<T> => {
        const manhattanNeighbors = getManhattanNeighbors(gridToValidateAgainst);
        let neighbors: Set<T> = new Set(manhattanNeighbors(x, y));
        let temp: Node, neighbor: Node;
        const checkAndAddNeighbor = validateAndReturnNeighbor(gridToValidateAgainst);

        // Check northwest neighbor
        temp = new Node(x - 1,  y + 1);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        // Check northeast neighbor
        temp = new Node(x + 1,  y + 1);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        // Check southwest neighbor
        temp = new Node(x - 1,  y - 1);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        // Check southeast neighbor
        temp = new Node(x + 1,  y - 1);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        return neighbors; 
    };
}

function getManhattanNeighbors<T extends Node, V>(grid: Immutable.Map<T, V>) {
    const gridToValidateAgainst = grid;

    return (x: number, y: number): Set<T> => {
        let temp: Node;
        let neighbor: Node;
        let neighbors: Set<T> = new Set();
        const checkAndAddNeighbor = validateAndReturnNeighbor(gridToValidateAgainst);

        // Check west neighbor
        temp = new Node(x - 1, y);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        // Check east neighbor
        temp = new Node(x + 1, y);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        // Check south neighbor
        temp = new Node(x, y - 1);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        // Check north neighbor
        temp = new Node(x, y + 1);
        neighbors = checkAndAddNeighbor(neighbors, temp);
        return neighbors;
    }
}

function validateAndReturnNeighbor<T extends Node, V>(grid: Immutable.Map<T, V> ) {
    const gridToValidateAgainst = grid;
    
    return (neighbors: Set<T>, toCheck: Node) => {
        let neighbor = checkNode(gridToValidateAgainst, toCheck);
        if(neighbor) return neighbors.add(neighbor);
        else return neighbors;
    }
   
}

function reconstructPath<T extends Node>(cameFrom: Immutable.Map<T, T>, start: T, current: T): Array<T> {
    let path: Array<T> = new Array<T>();
    do {
        path.push(current);
        current = cameFrom.get(current);
    }
    while (!isSameNode(start, current));
   
    return path.reverse();
}

function reconstructEdgePath<T>(cameFrom: Immutable.Map<T, T>, start:T, current: T): Array<T> {
    let path: Array<T> = new Array<T>();
    do {
        path.push(current);
        current = cameFrom.get(current);
    }
    while (current !== start);
   
    return path.reverse();
}


function isSameNode<T extends Node> (start: T, curr: T): boolean {
    return _.isEqual(start, curr);
}

function distanceBetween<T extends Node>(current: T, neighbor: T): number {
    let distance: number;
    let cX = current.x;
    let cY = current.y;
    let nX = neighbor.x;
    let nY = neighbor.y;

    let diffXSquared = (nX - cX) * (nX - cX);
    let diffYSquared = (nY - cY) * (nY - cY);

    distance = Math.sqrt(diffXSquared + diffYSquared);
    return distance;
}

function checkNode<T extends Node, V>(grid: Immutable.Map<T, V>, nodeToCheck: Node): T {
    let keys = grid.keys();
    let key = keys.next();
    let found = false;
    
    while (!key.done) {
        if (_.isEqual(key.value, nodeToCheck)) {
            found = true;
            break;
        }
        key = keys.next();
    }
    const canMove = found ? ConfigController.obstacleDetectionFn()(key.value) : false; 

    if(canMove) return key.value;

    return undefined;
}

export {
    getDiagonalNeighbors,
    getManhattanNeighbors,
    validateAndReturnNeighbor,
    reconstructPath,
    isSameNode,
    distanceBetween,
    checkNode
};
