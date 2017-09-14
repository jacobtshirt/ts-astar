import { ConfigController } from './config';
import { Node } from './node';
import { OrderedMap, Map } from 'immutable';
import { isSameNode } from './utility';

describe('isSameNode Function', () => {
    it('should return true if lhs.x === rhs.x AND lhs.y === rhs.y', () => {
        let lhs = new Node(0, 0);
        let rhs = new Node(0, 0);
        expect(isSameNode(lhs, rhs)).toEqual(true);
    });

    it('should return false if lhs.x !== rhs.x AND lhs.y === rhs.y', () => {
        let lhs = new Node(1, 0);
        let rhs = new Node(0, 0);
        expect(isSameNode(lhs, rhs)).toEqual(false);
    });

    it('should return false if lhs.x === rhs.x AND lhs.y !== rhs.y', () => {
        let lhs = new Node(0, 1);
        let rhs = new Node(0, 0);
        expect(isSameNode(lhs, rhs)).toEqual(false);
    });

    it('should return false if lhs.x !== rhs.x AND lhs.y !== rhs.y', () => {
        let lhs = new Node(0, 1);
        let rhs = new Node(1, 0);
        expect(isSameNode(lhs, rhs)).toEqual(false);
    });
});
