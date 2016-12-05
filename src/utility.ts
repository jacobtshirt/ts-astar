import { Config } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { Node } from "./node";
import { OrderedMap } from 'immutable';



export function getEuclideanNeighbors<T extends Node>(edgeList: EdgeList<T>, curr: T) {
    let neighbors: OrderedMap<number,T|Node> = OrderedMap<number,T|Node>();
    for (let edge of edgeList) { 
        if(isSameNode(curr, edge.from)) {
             neighbors = neighbors.set(edge.weight, edge.to);
        }
    }
    return neighbors;
}

export function getDiagonalNeighbors<T extends Node, V>(grid: Map<T, V>, x: number, y: number): Set<T|Node> {
    const width: number = Config.width();
    const height: number = Config.height();
    let neighbors: Set<T|Node> = new Set(getManhattanNeighbors<T, V>(grid, x, y));

    // Check northwest neighbor
    if (x - 1 >= 0 && y + 1 < height) {
        let node = new Node(x - 1,  y + 1);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }

    // Check northeast neighbor
    if (x + 1 < width && y + 1 < height) {
        let node = new Node(x + 1,  y + 1);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }

    // Check southwest neighbor
    if (x - 1 >= 0 && y - 1 >= 0) {
        let node = new Node(x - 1,  y - 1);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }

    // Check southeast neighbor
    if (x + 1 < width && y - 1 >= 0) {
        let node = new Node(x + 1,  y - 1);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }

    return neighbors;
}

export function getManhattanNeighbors<T extends Node, V>(grid: Map<T, V>, x: number, y: number): Set<T|Node> {
    const width: number = Config.width();
    const height: number = Config.height();
    let neighbors: Set<T|Node> = new Set();

    // Check west neighbor
    if (x - 1 >= 0) {
        let node = new Node(x - 1, y);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }
    // Check east neighbor
    if (x + 1 < width) {
        let node = new Node(x + 1, y);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }
    // Check south neighbor
    if (y - 1 >= 0) {
        let node = new Node(x, y - 1);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }
    // Check north neighbor
    if (y + 1 < height) {
        let node = new Node(x, y + 1);
        if (canMoveToNode(grid, node)) {
            neighbors.add(node);
        }
    }

    return neighbors;
}

export function isSameNode<T extends Node>(lhs: T, rhs: T): boolean {
    return lhs.x === rhs.x
        && lhs.y === rhs.y;
}

export function reconstructPath<T extends Node>(cameFrom: Map<T, T>, current: T): Set<T> {
    let path: Set<T> = new Set<T>();
    do {
        path.add(current);
        current = cameFrom.get(current);
    }
    while (!isStartNode(current));

    return path;
}

export function isStartNode<T extends Node> (curr: T): boolean {
    return isSameNode(curr, Config.startNode());
}

export function distanceBetween<T extends Node>(current: T, neighbor: T): number {
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

export function canMoveToNode<T extends Node, V>(grid: Map<T, V>, nodeToCheck: T): boolean {
    let keys = grid.keys();
    let key = keys.next();
    let found = false;
    
    while (key.done !== true) {
        if (isSameNode<T>(key.value, nodeToCheck)) {
            found = true;
            break;
        }
        key = keys.next();
    }
    return grid.get(key.value) !== Config.obstacle();
}

