import { ConfigController } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { getManhattanHeuristic } from "./heuristics"
import { Node } from "./node";
import { isSameNode, reconstructPath, reconstructEdgePath, getDiagonalNeighbors, getManhattanNeighbors, getEuclideanNeighbors, distanceBetween } from "./utility";
import * as Immutable from 'immutable';
import * as _ from 'lodash';

type Configuration<T extends Node> = {
    navigation?: string
    , detectObstacle: Function
    , startNode: T
    , goalNode: T
}


export function astar<T extends Node, V>(searchableGrid: Map<T, V> | Immutable.Map<T, V>, config: Configuration<T>) {
    let path: Array<T> = new Array<T>();
    const grid: Immutable.Map<T, V> = Immutable.Map<T,V>(searchableGrid);

    ConfigController.navigation(config.navigation);
    ConfigController.obstacleDetectionFn(config.detectObstacle);
    ConfigController.startNode(config.startNode);
    ConfigController.goalNode(config.goalNode);

    if(grid instanceof Map && !(grid instanceof Array)) {
        path = searchGrid<T, V>(grid);
    }
    return path;
}

function searchGrid<T extends Node, V>(grid: Map<T, V>): Array<T> {
    let path: Array<T>;
    let cameFrom: Immutable.Map<T, T> = Immutable.Map<T, T>();
    let getNeighborsFn: Function;
    let nav = ConfigController.navigation();
    

    let openSet: Immutable.OrderedMap<T, number> = Immutable.OrderedMap<T, number>();
    let closedSet: Immutable.Set<T> =  Immutable.Set<T>();
    let costSoFar: Immutable.Map<T, number> = Immutable.Map<T, number>();
    let start = ConfigController.startNode();
    openSet = openSet.set(start, 0);
    costSoFar = costSoFar.set(start, 0);

    switch(nav) {
        case 'DIAGONAL':
            getNeighborsFn = getDiagonalNeighbors(grid);
            break;
        case 'EUCLIDIAN':
            getNeighborsFn = getEuclideanNeighbors(grid);
            break;
        case 'MANHATTAN':
        default:
            getNeighborsFn = getManhattanNeighbors(grid);
            break;
    }

    while(!openSet.isEmpty()) {
        const currentPriority = openSet.min();
        const currentNode = openSet.keyOf(currentPriority);
        openSet = openSet.delete(currentNode);
        closedSet = closedSet.add(currentNode);
        if(_.isEqual(currentNode, ConfigController.goalNode())){
            path = reconstructPath<T>(cameFrom, currentNode);
            break;
        }

        const neighbors = getNeighborsFn(currentNode.x, currentNode.y);
       
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
