import { astar } from "./a-star";
import { Config } from "./config";
import { EdgeList } from "./custom-types";
import { Edge } from "./edge";
import { Node } from "./node";
import { OrderedMap, Map } from 'immutable';


describe("astar Function", () => {
    let grid: Map<Node, string> = Map<Node, string>();
    beforeAll(() => {

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                grid = grid.set(new Node(i, j), ' ');
            }
        }
    })
    it("should return shortest path set if map is given", () => {
        Config.obstacle('#');
        expect(astar<Node, string>(new Node(0, 0),
                                    new Node(3, 4), grid))
                                    .toBeDefined();
    });

    it("should return set if array is given", () => {
        expect(astar<Node, Edge<Node>>(new Node(0, 0),
            new Node(3, 4),
            new Array().concat(new Edge(new Node(1, 2), new Node(1, 2), 0))))
            .toBeDefined();
    });
})

