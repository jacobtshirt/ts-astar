import { Edge } from "./edge";
import { Node } from "./node";
class V<T extends Node> extends Edge<T> { 

};
export type EdgeList<T extends Node> = Array<V<T>>;
