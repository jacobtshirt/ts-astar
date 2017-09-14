import { ConfigController } from './config';
import { Node } from './node';
import { OrderedMap, Map } from 'immutable';
import * as Utility from './utility';

describe('Utility', () => {
    class SomeChildClass extends Node {
        isObstacle: boolean;
        constructor(x: number, y: number) {
            super(arguments[0], arguments[1]);
        }
    }

    let grid: Map<SomeChildClass, string>;
    beforeEach(() => {
        grid = Map<SomeChildClass, string>();
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                grid = grid.set(new SomeChildClass(i, j), ' ');
            }
        }
    });

    describe('isSameNode', () => {
        it('should return true if lhs.x === rhs.x AND lhs.y === rhs.y', () => {
            let lhs = new Node(0, 0);
            let rhs = new Node(0, 0);
            expect(Utility.isSameNode(lhs, rhs)).toEqual(true);
        });
    
        it('should return false if lhs.x !== rhs.x AND lhs.y === rhs.y', () => {
            let lhs = new Node(1, 0);
            let rhs = new Node(0, 0);
            expect(Utility.isSameNode(lhs, rhs)).toEqual(false);
        });
    
        it('should return false if lhs.x === rhs.x AND lhs.y !== rhs.y', () => {
            let lhs = new Node(0, 1);
            let rhs = new Node(0, 0);
            expect(Utility.isSameNode(lhs, rhs)).toEqual(false);
        });
    
        it('should return false if lhs.x !== rhs.x AND lhs.y !== rhs.y', () => {
            let lhs = new Node(0, 1);
            let rhs = new Node(1, 0);
            expect(Utility.isSameNode(lhs, rhs)).toEqual(false);
        });
    });
    
    describe('getDiagonalNeighbors', () => {
       
    });
    
    describe('getManhattanNeighbors', () => {
        
    });

    describe('validateAndReturnNeighbor', () => {
        
    });

    describe('reconstructPath', () => {
        
    });

    describe('distanceBetween', () => {
        it('should return a distance of 10', () => {
            const result = Utility.distanceBetween(new Node(0, 0), new Node(10, 0));
            expect(result).toBe(10);
        });

        it('should return a distance of 10', () => {
            const result = Utility.distanceBetween(new Node(0, -10), new Node(0, 0));
            expect(result).toBe(10);
        });
    });

    describe('checkNode', () => {
        it('should return a reference to the node inside grid that is equal to nodeToCheck if canMove is true', () => {
            const result = Utility.checkNode(grid, new Node(0, 0));

            expect(result).toBeDefined();
        });

        it('should return undefined if nodeToCheck is not found inside the grid', () => {
            const result = Utility.checkNode(grid, new Node(0, -230));

            expect(result).toBeUndefined();
        });

        it('should return a reference to the node inside grid if nodeToCheck is found and nodeToCheck is not obstacle', () => {
            ConfigController.obstacleDetectionFn(() => true);
            const result = Utility.checkNode(grid, new Node(0, 0));

            expect(result).toBeDefined();
        });

        it('should undefined if nodeToCheck is found and nodeToCheck is obstacle', () => {
            ConfigController.obstacleDetectionFn(() => false);
            const result = Utility.checkNode(grid, new Node(0, 0));

            expect(result).toBeUndefined();
        });
    });
});
