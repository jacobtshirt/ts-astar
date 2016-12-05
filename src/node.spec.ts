import { Node } from "./node";

describe("T extends Node", () => {
    it("t.x should be defined", () => {
        let t = new Node(0, 0);
        expect(t.x).toBeDefined();
        expect({x: 1, y: 1}.x).toBeDefined();

    });
    it("t.y should be defined", () => {
        let t = new Node(0, 0);
        expect(t.y).toBeDefined();
        expect({x: 1, y: 1}.y).toBeDefined();
    });
});