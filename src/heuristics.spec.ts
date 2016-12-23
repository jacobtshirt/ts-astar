import { heuristics } from './heuristics';
import { Node } from "./node";

describe("Heuristics testing", () => {
    let goal = new Node(3, 2), curr = new Node(20, 20);
    let heuristicsManhattanFn, heuristicsEuclideanFn, heuristicsDiagonalFn;
    beforeAll(()=> {
        heuristicsManhattanFn = heuristics(goal, 'MANHATTAN');
        heuristicsEuclideanFn = heuristics(goal, 'EUCLIDEAN');
        heuristicsDiagonalFn = heuristics(goal, 'DIAGONAL');
    })
    
    it("should return a function for MANHATTAN distance", ()=> {
        expect(heuristicsManhattanFn).toBeDefined();
    })
    it("should return a function for DIAGONAL distance", ()=> {
        expect(heuristicsDiagonalFn).toBeDefined();;
    })
    it("should return a function for EUCLIDEAN distance", ()=> {
        expect(heuristicsEuclideanFn).toBeDefined();
    })

    it("should return number greater than 0 for MANHATTAN distance", () => {
        expect(heuristicsManhattanFn(curr)).toBeGreaterThanOrEqual(0);
    })

    it("should return number greater than 0 for EUCLIDEAN distance", () => {
        expect(heuristicsEuclideanFn(curr)).toBeGreaterThanOrEqual(0);
    })

    it("should return number greater than 0 for DIAGONAL distance", () => {
        expect(heuristicsDiagonalFn(curr)).toBeGreaterThanOrEqual(0);
    })

});