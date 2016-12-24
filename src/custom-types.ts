import { Node } from "./node";

export interface Configuration<T extends Node> {
    navigation?: string
    , detectObstacle: Function
    , startNode: T
    , goalNode: T
}