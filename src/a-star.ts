import { Config } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { getManhattanHeuristic } from "./heuristics"
import { Node } from "./node";
import { isSameNode, reconstructPath, getDiagonalNeighbors, getManhattanNeighbors, distanceBetween } from "./utility";
import { OrderedMap, OrderedSet } from 'immutable';


export function astar<T extends Node, V>(start: T, goal: T, grid?: Map<T, V> | EdgeList<T>, navigation: string = 'Manhattan'): Set<T> {
    let path: Set<T>;

    Config.navigation(navigation);
    Config.goalNode(goal);
    Config.startNode(start);

    if(grid instanceof Map) {
        path = searchGrid<T, V>(start, goal, grid);
    } else if(grid instanceof Array) {
        path = searchGraph<T, V>(start, goal, grid);
    }

    console.log(path);
    return path;
}

function searchGrid<T extends Node, V>(start: T, goal: T, grid: Map<T, V> ): Set<T> {
    let path: Set<T>;
    let cameFrom: Map<T|Node, T|Node> = new Map();
    //let curr = start;

    let openSet: OrderedMap<T|Node, number> = OrderedMap<T|Node, number>();
    let closedSet:  Set<T|Node> = new Set();
    let costSoFar: Map<T|Node, number> = new Map();
    openSet = openSet.set(start, 0);
    costSoFar.set(start, 0);
    while(!openSet.isEmpty()) {
        let currentValue = openSet.min();
        let currentKey = openSet.keyOf(currentValue);
        openSet = openSet.delete(currentKey);
        closedSet.add(currentKey);
        if(isSameNode(currentKey, goal)){
            path = reconstructPath<T|Node>(cameFrom, currentKey) as Set<T>;
            console.log('reconstructing', path);
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
            const costKeys = costSoFar.keys();
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
                costSoFar.set(neighbor, tempCost)
                const priority = tempCost + getManhattanHeuristic(currentKey, neighbor);
                openSet = openSet.set(neighbor, priority);
                cameFrom.set(neighbor, currentKey);
            }
        }
    
        
    }

    return path;

}

function searchGraph<T extends Node, V>(start: T, goal: T, graph: EdgeList<T>): Set<T> {
    let path: Set<T> = new Set();

    return path;
}
