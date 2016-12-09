import { Config } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { getManhattanHeuristic } from "./heuristics"
import { Node } from "./node";
import { isSameNode, reconstructPath, reconstructEdgePath, getDiagonalNeighbors, getManhattanNeighbors, getEuclideanNeighbors, distanceBetween } from "./utility";
import { OrderedMap, OrderedSet, Map, Set } from 'immutable';
import * as _ from 'lodash';


export function astar<T extends Node, V>(start: T, goal: T, grid?: Map<T, V> | EdgeList<T>, navigation: string = 'Manhattan') {
    let path: Array<T> = new Array<T>();

    Config.navigation(navigation);
    Config.goalNode(goal);
    Config.startNode(start);

    if(grid instanceof Map && !(grid instanceof Array)) {
        path = searchGrid<T, V>(start, goal, grid);
    } else if(grid instanceof Array && !(grid instanceof Map)) {
        console.log('grid',grid)
        path = searchGraph<T, V>(start, goal, grid);
    }
    console.log(path);
    return path;
}

function searchGrid<T extends Node, V>(start: T, goal: T, grid: Map<T, V>): Array<T> {
    let path: Array<T>;
    let cameFrom: Map<T, T> = Map<T, T>();

    const getNeighbors = Config.navigation() === 'Diagonal'
                            ? getDiagonalNeighbors(grid) 
                            : getManhattanNeighbors(grid);

    let openSet: OrderedMap<T, number> = OrderedMap<T, number>();
    let closedSet:  Set<T> =  Set<T>();
    let costSoFar: Map<T, number> = Map<T, number>();
    openSet = openSet.set(start, 0);
    costSoFar = costSoFar.set(start, 0);

    while(!openSet.isEmpty()) {
        const currentPriority = openSet.min();
        const currentNode = openSet.keyOf(currentPriority);
        openSet = openSet.delete(currentNode);
        closedSet = closedSet.add(currentNode);
        if(_.isEqual(currentNode, goal)){
            path = reconstructPath<T>(cameFrom, currentNode);
            break;
        }

        const neighbors = getNeighbors(currentNode.x, currentNode.y);
       
        for(let neighbor of neighbors) {
            
            if(closedSet.has(neighbor)) continue;
    
            const tempCost = costSoFar.get(currentNode) + distanceBetween(currentNode, neighbor);
            if(!costSoFar.has(neighbor) || tempCost < costSoFar.get(neighbor)) {
                const priority = tempCost + getManhattanHeuristic(currentNode, neighbor);
                costSoFar = costSoFar.set(neighbor, tempCost);
                openSet = openSet.set(neighbor, priority);
                cameFrom = cameFrom.set(neighbor, currentNode);
            }
        }
    
        
    }

    return path;

}

function searchGraph<T, V>(start: T, goal: T, graph: EdgeList<T>): Array<T> {
    let path: Array<T> = new Array();
    let cameFrom: Map<T, T> = Map<T, T>();
    let openSet: OrderedMap<T, number> = OrderedMap<T, number>();
    let closedSet:  Set<T> =  Set<T>();
    let costSoFar: Map<T, number> = Map<T, number>();
    console.log('graph',graph);
    const getNeighbors = getEuclideanNeighbors(graph);
    openSet = openSet.set(start, 0);
    costSoFar = costSoFar.set(start, 0);

    while(!openSet.isEmpty()){
        const currentPriority = openSet.min();
        const currentNode = openSet.keyOf(currentPriority);
        openSet = openSet.delete(currentNode);
        closedSet = closedSet.add(currentNode);
        console.log('current', currentNode);
        
        if(_.isEqual(currentNode, goal)) { 
            path = reconstructEdgePath(cameFrom, start, currentNode);
            break;
        }

        let neighbors = getNeighbors(currentNode);
        console.log('neighbors',neighbors.toJS());

        neighbors.forEach((val: T, key: number) => {
            console.log('neigh')
            const neighbor = val;
            const neighborImmediateCost = key;
            let currCost = costSoFar.get(currentNode) || 0;
            console.log('closedSet',closedSet)
            if(closedSet.has(neighbor)){
                return true;
            }
            const neighborTempCost = currCost + neighborImmediateCost;
            if(!costSoFar.has(neighbor) || neighborTempCost < costSoFar.get(neighbor)){
                console.log('hello')
                const priority = neighborTempCost + 10; // rand in place of heuristic for now
                costSoFar = costSoFar.set(neighbor, neighborTempCost);
                openSet = openSet.set(neighbor, priority);
                cameFrom = cameFrom.set(neighbor, currentNode);

            }
            
        })
    }

    return path;
}
