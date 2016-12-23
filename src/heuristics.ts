import { Node } from "./node";

const cardinalMoveCost = 1;
const interCardinalMoveCost = Math.SQRT2;

export function getManhattanHeuristic<T extends Node>(goal: T) {
    const goalNode = goal;
    return (curr: T) => {
        const dx = Math.abs(curr.x - goal.x);
        const dy = Math.abs(curr.y - goal.y);
        return dx + dy;
    }
   
}


export function getDiagonalHeuristic<T extends Node>(goal: T) {
    const goalNode = goal;
    return (curr: T) => {
        const dx = Math.abs(curr.x - goal.x);
        const dy = Math.abs(curr.y - goal.y);
        return cardinalMoveCost
            * (dx + dy) 
            + (interCardinalMoveCost - 2 * cardinalMoveCost)
            * Math.min(dx, dy);
    }
    
}

export function getEuclideanHeuristic<T extends Node>(goal: T) {
    const goalNode = goal;
    return (curr: T) => {
        const dx = Math.abs(curr.x - goal.x);
        const dy = Math.abs(curr.y - goal.y);
        return cardinalMoveCost * Math.sqrt(dx * dx + dy * dy);
    }
    
}