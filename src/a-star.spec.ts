import { astar } from "./a-star";
import { ConfigController } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { Node } from "./node";
import { OrderedMap, Map } from 'immutable';
class SomeChildClass extends Node {
    isObstacle:boolean;
    constructor(x: number, y: number, isObstacle: boolean) {
        super(arguments[0], arguments[1]);
        this.isObstacle = isObstacle;
    }
}

describe("astar Function", () => {
    let grid: Map<SomeChildClass, string> = Map<SomeChildClass, string>();
    beforeAll(() => {
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let isObstacle = Math.floor(Math.random() * 100) % 5 === 0;
                grid = grid.set(new SomeChildClass(i, j, isObstacle), ' ');
            }
        }
    })
    it("should return shortest path set if map is given", () => {
        let config = {
            navigation: 'MANHATTAN'
            , detectObstacle: 
                        function(node): boolean {
                            console.log(arguments.callee);
                            console.log('node', node);
                            return !node.isObstacle
                        }
            , startNode: new SomeChildClass(0, 0, false)
            , goalNode: new SomeChildClass(3, 4, false)
        }
        expect(astar<SomeChildClass, string>(grid, config))
                                    .toBeDefined();
    });

})

