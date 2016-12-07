import { Node } from "./node";

export function getManhattanHeuristic<T extends Node>(curr: T, neighbor: T): number {
    const dx = Math.abs(curr.x - neighbor.x);
    const dy = Math.abs(curr.y - neighbor.y);
    return dx + dy;
}
