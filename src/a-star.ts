import { Config } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { Node } from "./node";
import { OrderedMap } from 'immutable';


function astar<T extends Node, V>(start: T, goal: T, graph: Map<T, V> | EdgeList<T>): Set<T> {
    let path: Set<T> = new Set();

    return path;
}
