import { Config } from "./config";
import { Node } from "./node";

function getEuclideanNeighbors() {

}

function getDiagonalNeighbors(grid: Map<Node, string>, x: number, y: number): Set<Node> {
    const width: number = Config.width();
    const height: number = Config.height();
    let neighbors: Set<Node> = new Set<Node>(getManhattanNeighbors());

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

function getManhattanNeighbors(grid: Map<Node, string>, x: number, y: number): Set<Node> {
    const width: number = Config.width();
    const height: number = Config.height();
    let neighbors: Set<Node> = new Set<Node>();

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

function isSameNode(lhs: Node, rhs: Node): boolean {
    return lhs.x === rhs.x
        && lhs.y === rhs.y;
}

function reconstructPath(cameFrom: Map<Node, Node>, current: Node): Set<Node> {
    let path: Set<Node> = new Set<Node>();
    do {
        path.add(current);
        current = cameFrom.get(current);
    }
    while (!isStartNode(current));

    return path;
}

function isStartNode(curr: Node): boolean {
    return isSameNode(curr, Config.startNode());
}

function distanceBetween(current: Node, neighbor: Node){
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

function canMoveToNode(grid: Map<Node, string>, nodeToCheck: Node) {
    return grid.get(nodeToCheck) !== Config.obstacleChar();
}

export {getManhattanNeighbors as getManhattanNeighbors, isSameNode as isSameNode, reconstructPath as reconstructPath,
    distanceBetween as distanceBetween};
