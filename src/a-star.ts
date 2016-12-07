import { Config } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { getManhattanHeuristic } from "./heuristics"
import { Node } from "./node";
import { isSameNode, reconstructPath, getDiagonalNeighbors, getManhattanNeighbors, distanceBetween } from "./utility";
import { OrderedMap, OrderedSet, Map } from 'immutable';


export function astar<T extends Node, V>(start: T, goal: T, grid?: Map<T, V> | EdgeList<T>, navigation: string = 'Manhattan') {
    let path: Array<T> = new Array<T>();

    Config.navigation(navigation);
    Config.goalNode(goal);
    Config.startNode(start);

    if(grid instanceof Map && !(grid instanceof Array)) {
        path = searchGrid<T, V>(start, goal, grid);
    } else if(grid instanceof Array && !(grid instanceof Map)) {
        path = searchGraph<T, V>(start, goal, grid);
    }
    return path;
}

function searchGrid<T extends Node, V>(start: T, goal: T, grid: Map<T, V> ): Array<T> {
    let path: Array<T>;
    let cameFrom: Map<T, T> = Map<T, T>();

    const getNeighbors = Config.navigation() === 'Diagonal'
                            ? getDiagonalNeighbors(grid) 
                            : getManhattanNeighbors(grid);

    let openSet: OrderedMap<T, number> = OrderedMap<T, number>();
    let closedSet:  Set<T> = new Set();
    let costSoFar: Map<T, number> = Map<T, number>();
    openSet = openSet.set(start, 0);
    costSoFar = costSoFar.set(start, 0);

    while(!openSet.isEmpty()) {
        const currentValue = openSet.min();
        const currentKey = openSet.keyOf(currentValue);
        openSet = openSet.delete(currentKey);
        closedSet.add(currentKey);
        if(isSameNode(currentKey, goal)){
            path = reconstructPath<T>(cameFrom, currentKey);
            break;
        }

        const neighbors = Config.navigation() === 'Diagonal'
                            ? getDiagonalNeighbors(grid as Map<T, V>, currentKey.x, currentKey.y) 
                            : getManhattanNeighbors(grid as Map<T, V>, currentKey.x, currentKey.y);
       
        for(let neighbor of neighbors) {
            
            const closedKeys = closedSet.keys();
            let closedKey = closedKeys.next();
            let inClosedSet = false;
            while(!closedKey.done){
                let val = closedKey.value;
                if(isSameNode(neighbor, val)){
                    inClosedSet = true;
                    break;
                }
                closedKey = closedKeys.next();
            }
            if(inClosedSet) continue;

            let neighborFound = false;
            let costKeys = costSoFar.keys();
            let costKey = costKeys.next();
            let currCost = 0;
            let currFound = false;
            let neighborCost = Infinity;
            while(!costKey.done || (!currFound && !neighborFound)) {
                const val = costKey.value;
                if(isSameNode(currentKey, val)){
                    currCost = costSoFar.get(val);
                    currFound = true;
                } else if(isSameNode(neighbor, val)) {
                    neighborCost = costSoFar.get(val);
                    neighborFound = true;
                }
                costKey = costKeys.next();
            }
            
            const tempCost = currCost + distanceBetween(currentKey, neighbor);
            if(!neighborFound || tempCost < neighborCost) {
                const priority = tempCost + getManhattanHeuristic(currentKey, neighbor);
                costSoFar = costSoFar.set(neighbor, tempCost);
                openSet = openSet.set(neighbor, priority);
                cameFrom = cameFrom.set(neighbor, currentKey);
            }
        }
    
        
    }

    return path;

}

function searchGraph<T extends Node, V>(start: T, goal: T, graph: EdgeList<T>): Array<T> {
    let path: Array<T> = new Array();

    return path;
}
