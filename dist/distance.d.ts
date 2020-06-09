import type { CartesianVector as Vector, Node } from './graph';
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the closest position of n2 relative to n1 while avoiding overlapping, along the (n1,n2) line.
 */
export declare function optimalVector(n1: Node, n2: Node, padding?: number): Vector;
/**
 *
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the minimal vector between two nodes ; the closest position of n2 relative to n1 according his current position, while avoiding overlapping
 */
export declare function minimalVector(n1: Node, n2: Node, padding?: number): Vector;
//# sourceMappingURL=distance.d.ts.map