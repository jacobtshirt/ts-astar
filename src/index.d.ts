import * as Immutable from 'immutable';
import { Node } from "./node";
import { Configuration } from './custom-types';
declare function astar<T extends Node, V>(searchableGrid: Map<T, V> | Immutable.Map<T, V>, config: Configuration<T>): T[];