import { ConfigController } from "./config";
import { heuristics } from "./heuristics"
import { Node } from "./node";
import { reconstructPath, getDiagonalNeighbors, getManhattanNeighbors, getEuclideanNeighbors, distanceBetween } from "./utility";
import * as Immutable from 'immutable';
import * as _ from 'lodash';

type Configuration<T extends Node> = {
    navigation?: string
    , detectObstacle: Function
    , startNode: T
    , goalNode: T
}


export function astar<T extends Node, V>(searchableGrid: Map<T, V> | Immutable.Map<T, V>, config: Configuration<T>) {
    // Define and initialize path returned by astar.
    // Empty path is returned if no path is found
    // A* always finds a path.
    let path: Array<T> = new Array<T>();
    // Make sure grid is an Immutable Map, not an ES6 object.
    const grid: Immutable.Map<T, V> = Immutable.Map<T,V>(searchableGrid);

    // Configuration
    ConfigController.navigation(config.navigation);
    ConfigController.obstacleDetectionFn(config.detectObstacle);
    ConfigController.startNode(config.startNode);
    ConfigController.goalNode(config.goalNode);

    // Search
    if(grid instanceof Map && !(grid instanceof Array)) {
        path = searchGrid<T, V>(grid, config.startNode, config.goalNode);
    }
    return path;
}

function searchGrid<T extends Node, V>(grid: Immutable.Map<T, V>, start: T, goal: T): Array<T> {
    
    
    // Define path that evenutally gets returned by searchGrid.
    // standard ES6 Array.
    let path: Array<T>;

    // Initialize map/grid travel data stores.
    // Immutable
    let cameFrom: Immutable.Map<T, T> = Immutable.Map<T, T>();
    let openSet: Immutable.OrderedMap<T, number> = Immutable.OrderedMap<T, number>();
    let closedSet: Immutable.Set<T> = Immutable.Set<T>();
    let costSoFar: Immutable.Map<T, number> = Immutable.Map<T, number>();
    
    // Initialize navigation and neighbor checking
    let getNeighborsFn: Function;
    const nav = ConfigController.navigation();
    const heuristic = heuristics(goal, nav);
    switch(nav) {
        case 'DIAGONAL':
            getNeighborsFn = getDiagonalNeighbors(grid);
            break;
        case 'EUCLIDEAN':
            getNeighborsFn = getEuclideanNeighbors(grid);
            break;
        case 'MANHATTAN':
        default:
            getNeighborsFn = getManhattanNeighbors(grid);
            break;
    }

    // Insert starting node into the open (frontier) and [travel] cost sets.
    openSet = openSet.set(start, 0);
    costSoFar = costSoFar.set(start, 0);

    while(!openSet.isEmpty()) {
        // Pull next node off openSet based on lowest priority (lowest heuristic)
        const currentPriority = openSet.min();
        const currentNode = openSet.keyOf(currentPriority);
        // Remove from the open set and add to closed (visited) set 
        openSet = openSet.delete(currentNode);
        closedSet = closedSet.add(currentNode);

        // Goal check
        if(_.isEqual(currentNode, goal)){
            path = reconstructPath<T>(cameFrom, start, currentNode);
            break;
        }

        // Collect neighbors of current node
        const neighbors = getNeighborsFn(currentNode.x, currentNode.y);
       
        // For each neighbor
        for(let neighbor of neighbors) {
            
            // If neighbor has been visited, skip to next neighbor
            if(closedSet.has(neighbor)) continue;
    
            // add the cost to move to the neighbor to the current travel cost
            const tempCost = costSoFar.get(currentNode) + distanceBetween(currentNode, neighbor);
            // if not in costSoFar or the new cost is less than what we currently know about cost to travel to the neighbor...
            if(!costSoFar.has(neighbor) || tempCost < costSoFar.get(neighbor)) {
                // Calcuate priority (heuristic + travel cost);
                const priority = tempCost + heuristic(goal); // TODO: fix for diagonal and euclidean

                // Set the new, lower travel cost of the neighbor
                costSoFar = costSoFar.set(neighbor, tempCost);
                // Add neighbor to the open set
                openSet = openSet.set(neighbor, priority);
                // breadcrumbs for finding our away back to the start
                cameFrom = cameFrom.set(neighbor, currentNode);
            }
        }
    }
    return path;
}
