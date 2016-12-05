import { Edge } from "./edge";
import { Node } from "./node";
export type EdgeList<T extends Node> = Array<Edge<T>>;
