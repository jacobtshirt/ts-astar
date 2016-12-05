import { Node } from "./node";
export class Edge<T extends Node> {
    private _to: T;
    private _from: T;
    private _weight: number;

    constructor(to: T, from: T, weight: number) {
        this._to = to;
        this._from = from;
        this._weight = weight;
    }
    public get to (): T {
        return this._to;
    }
    public  set to (newTo: T) {
        this._to = newTo;
    }
    public get from (): T {
        return this._from;
    }
    public  set from (newFrom: T) {
        this._from = newFrom;
    }
    public set weight (newWeight: number) { 
        this._weight = newWeight; 
    }
    public get weight (): number { 
        return this._weight;
    }
}
