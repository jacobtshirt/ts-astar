import { Node } from "./node";

export namespace ConfigController{
    let _navigation: string;
    let _width: number;
    let _height: number;
    let _obstacleDetectionFn: Function;
    let _startNode: any;
    let _goalNode: any;

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
    export function obstacleDetectionFn(newObstacleDetectionFN?: Function): Function {
        if (newObstacleDetectionFN) {
            _obstacleDetectionFn = newObstacleDetectionFN;
        }
        return _obstacleDetectionFn;
    }

    /**
     * Get/set node that the agent should start at
     * @param newStartNode
     * @returns {Node}
     */
    export function startNode(newStartNode?: any): any {
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
    export function goalNode(newGoalNode?: any): any {
        if (newGoalNode) {
            _goalNode = newGoalNode;
        }
        return _goalNode;
    }
}
