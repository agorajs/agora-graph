import type { Node, Edge } from './graph';
import type { NodeMap } from './node-map';
export declare type Options = {
    padding?: number;
    epsilon?: number;
};
/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap
 */
export declare function overlap(n1: Node, n2: Node, options?: Options): boolean;
/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap on x
 */
export declare function overlapX(n1: Node, n2: Node, { padding, epsilon }?: Options): boolean;
/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap on y
 */
export declare function overlapY(n1: Node, n2: Node, { padding, epsilon }?: Options): boolean;
/**
 * @param nodes
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if at least two nodes of the list overlap
 */
export declare function hasOverlap(nodes: Node[], options?: Options): boolean;
/**
 * Get all the overlaps between couple of nodes
 * @param map map of nodes having their index as keys
 * @param edges
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 */
export declare function edgeOverlap(map: NodeMap, edges: Edge[], options?: Options): boolean;
/**
 * @param nodes
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns the list of all overlaps of the graph.
 */
export declare function getAllOverlaps(nodes: Node[], options?: Options): Node[][];
//# sourceMappingURL=overlap.d.ts.map