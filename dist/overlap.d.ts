import { Node, Edge } from './graph';
import { NodeMap } from './node-map';
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap
 */
export declare function overlap(n1: Node, n2: Node, padding?: number): boolean;
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap on x
 */
export declare function overlapX(n1: Node, n2: Node, padding?: number): boolean;
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap on y
 */
export declare function overlapY(n1: Node, n2: Node, padding?: number): boolean;
/**
 * @param nodes
 * @param padding
 * @returns true if at least two nodes of the list overlap
 */
export declare function hasOverlap(nodes: Node[], padding?: number): boolean;
/**
 * Get all the overlaps between couple of nodes
 * @param map map of nodes having their index as keys
 * @param edges
 * @param padding
 */
export declare function edgeOverlap(map: NodeMap, edges: Edge[], padding?: number): boolean;
/**
 * @param {Node[]} nodes
 * @param {number} [padding]
 *
 * @returns the list of all overlaps of the graph.
 */
export declare function getAllOverlaps(nodes: Node[], padding?: number): Node[][];
