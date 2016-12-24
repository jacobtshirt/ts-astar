import * as Immutable from 'immutable';
import { Node } from "./src/node";
import { Configuration } from './src/configuration';
declare function astar<T extends Node, V>(searchableGrid: Map<T, V> | Immutable.Map<T, V>, config: Configuration<T>): T[];