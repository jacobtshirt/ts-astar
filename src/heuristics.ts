import { Node } from "./node";

export function getManhattanHeuristic(curr: Node, neighbor: Node): number {
    const dx = Math.abs(curr.x - neighbor.x);
    return dx;
}
