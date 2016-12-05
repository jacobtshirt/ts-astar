import { Node } from "./node";

export namespace Config {
    let _navigation: string;
    let _width: number;
    let _height: number;
    let _obstacle: any;
    let _startNode: Node;
    let _goalNode: Node;

    /**
     * Get/Set the navigation style (allowed directional movement)
     * Manhattan | Diagonal | Euclidean
     * @param newNavigation
     * @returns {string}
     */
    export function navigation(newNavigation?: string): string {
        if (newNavigation) {
            _navigation = newNavigation;
        }
        return _navigation;
    }

    /**
     * Get/Set width of grid
     * @param newWidth
     * @returns {number}
     */
    export function width(newWidth?: number): number {
        if (newWidth) {
            _width = newWidth;
        }
        return _width;
    }

    /**
     * Get/Set height of grid
     * @param newHeight
     * @returns {number}
     */
    export function height(newHeight?: number): number {
      if (newHeight) {
          _height = newHeight;
      }
      return _height;
    }

    /**
     * Get/set the character used to represent obstacles on the grid
     * @param newObstacleChar
     * @returns {any}
     */
    export function obstacle(newObstacle?: string): any {
        if (newObstacle) {
            _obstacle = newObstacle;
        }
        return _obstacle;
    }

    /**
     * Get/set node that the agent should start at
     * @param newStartNode
     * @returns {Node}
     */
    export function startNode(newStartNode?: Node): Node {
        if (newStartNode) {
            _startNode = newStartNode;
        }
        return _startNode;
    }

    /**
     * Get/set node that the agent should end at
     * @param newGoalNode
     * @returns {Node}
     */
    export function goalNode(newGoalNode?: Node): Node {
        if (newGoalNode) {
            _goalNode = newGoalNode;
        }
        return _goalNode;
    }
}
