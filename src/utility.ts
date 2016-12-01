import {Location} from "./Location";

function getManhattanNeighbors(grid: Map<Location, string>, x: number, y: number){
    let width: number = Math.sqrt(grid.size);
    let height: number = width;
    let neighbors: Set<Location> = new Set<Location>();
    if (x - 1 >= 0) {
        let l = new Location(x - 1, y);
        if (grid.get(l) !== "#") {
            neighbors.add(l);
        }
    }
    if (x + 1 < width) {
        let l = new Location(x + 1, y);
        if (grid.get(l) !== "#") {
            neighbors.add(l);
        }
    }
    if (y - 1 >= 0) {
        let l = new Location(x, y - 1);
        if (grid.get(l) !== "#") {
            neighbors.add(l);
        }
    }
    if (y + 1 < height) {
        let l = new Location(x, y + 1);
        if (grid.get(l) !== "#") {
            neighbors.add(l);
        }
    }

    return neighbors;
}

function isSameLocation(lhs: Location, rhs: Location){
    return lhs.x === rhs.x && lhs.y === rhs.y;
}

function reconstructPath(cameFrom: Map<Location, Location>, start: Location, current: Location){
    let path: Set<Location> = new Set<Location>();
    function isStart(current: Location){
        return current.x == start.x && current.y == start.y;
    }
    do {
        path.add(current);
        current = cameFrom.get(current);
    }
    while(!isStart(current));

    return path;
}

function distanceBetween(current: Location, neighbor: Location){
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

export {getManhattanNeighbors as getManhattanNeighbors, isSameLocation as isSameLocation, reconstructPath as reconstructPath,
    distanceBetween as distanceBetween};