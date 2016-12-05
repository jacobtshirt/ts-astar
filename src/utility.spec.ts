import {Config} from "./config";
import {Node} from "./node";
import {canMoveToNode, isSameNode, isStartNode } from "./utility";

describe('isSameNode Function', () => {
    it("should return true if lhs.x === rhs.x AND lhs.y === rhs.y", () => {
        let lhs = new Node(0, 0);
        let rhs = new Node(0, 0);
        expect(isSameNode(lhs, rhs)).toEqual(true);
    });

    it("should return false if lhs.x !== rhs.x AND lhs.y === rhs.y", () => {
        let lhs = new Node(1, 0);
        let rhs = new Node(0, 0);
        expect(isSameNode(lhs, rhs)).toEqual(false);
    });

    it("should return false if lhs.x === rhs.x AND lhs.y !== rhs.y", () => {
        let lhs = new Node(0, 1);
        let rhs = new Node(0, 0);
        expect(isSameNode(lhs, rhs)).toEqual(false);
    });

    it("should return false if lhs.x !== rhs.x AND lhs.y !== rhs.y", () => {
        let lhs = new Node(0, 1);
        let rhs = new Node(1, 0);
        expect(isSameNode(lhs, rhs)).toEqual(false);
    });
});

describe('isStartNode Function', () => {
    let startNode = new Node(0, 0);
    Config.startNode(startNode);

    it("should return true if curr.x === startNode.x AND curr.y === startNode.y", () => {
        let curr = new Node(0, 0);
        expect(isStartNode(curr)).toEqual(true);
    });

    it("should return false if curr.x !== startNode.x AND curr.y === startNode.y", () => {
        let curr = new Node(1, 0);
        expect(isStartNode(curr)).toEqual(false);
    });

    it("should return false if curr.x === startNode.x AND curr.y !== startNode.y", () => {
        let curr = new Node(0, 1);
        expect(isStartNode(curr)).toEqual(false);
    });

    it("should return false if curr.x !== startNode.x AND curr.y !== startNode.y", () => {
        let curr = new Node(1, 1);
        expect(isStartNode(curr)).toEqual(false);
    });
});

describe('canMoveToNode Function', () => {

    let grid: Map<Node, string>;
    let availableNode: Node;
    let obstacleNode: Node;
    beforeAll(() => {
        grid = new Map<Node, string>();
        Config.obstacle('#');
        obstacleNode = new Node(2, 4);
        availableNode = new Node(4, 2);

        grid.set(obstacleNode, '#');
        grid.set(availableNode, ' ');
    });

    it("should return true if the neighbor node does not contain an obstacle", () => {
        let nodeToCheck: Node = new Node(4, 2);
        expect(canMoveToNode<Node, string>(grid, nodeToCheck)).toEqual(true);
    });

    it("should return false if the neighbor node contains an obstacle", () => {
        let nodeToCheck: Node = new Node(2, 4);
        expect(canMoveToNode<Node, string>(grid, nodeToCheck)).toEqual(false);
    });
});
