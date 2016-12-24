import { heuristics } from './heuristics';
import { Node } from "./node";

describe("Heuristics testing", () => {
    let goal = new Node(3, 2), curr = new Node(20, 20);
    beforeAll(()=> {
        this.heuristicsManhattanFn = heuristics(goal, 'MANHATTAN');
        this.heuristicsEuclideanFn = heuristics(goal, 'EUCLIDEAN');
        this.heuristicsDiagonalFn = heuristics(goal, 'DIAGONAL');
    })
    
    it("should return a function for MANHATTAN distance", ()=> {
        expect(this.heuristicsManhattanFn).toBeDefined();
    })
    it("should return a function for DIAGONAL distance", ()=> {
        expect(this.heuristicsDiagonalFn).toBeDefined();
    })
    it("should return a function for EUCLIDEAN distance", ()=> {
        expect(this.heuristicsEuclideanFn).toBeDefined();
    })

    it("should return number greater than 0 for MANHATTAN distance", () => {
        expect(this.heuristicsManhattanFn(curr)).toBeGreaterThanOrEqual(0);
    })

    it("should return number greater than 0 for EUCLIDEAN distance", () => {
        expect(this.heuristicsEuclideanFn(curr)).toBeGreaterThanOrEqual(0);
    })

    it("should return number greater than 0 for DIAGONAL distance", () => {
        expect(this.heuristicsDiagonalFn(curr)).toBeGreaterThanOrEqual(0);
    })

});