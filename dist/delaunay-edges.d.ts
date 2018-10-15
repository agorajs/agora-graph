import { Edge, Node } from './graph';
export default delaunay;
export declare function delaunay(nodes: Node[]): Edge[];
/**
 * augment the delaunay triangulation with the overlaping nodes
 * @param nodes list of nodes
 * @param padding padding between nodes
 */
export declare function augmented(nodes: Node[], padding: number): Edge[];
