import type { Edge, Node } from './graph';
import type { Options } from './overlap';
export default delaunay;
export declare function delaunay(nodes: Node[]): Edge[];
/**
 * augment the delaunay triangulation with the overlaping nodes
 * @param nodes list of nodes
 * @param padding padding between nodes
 */
export declare function augmented(nodes: Node[], options: Options): Edge[];
//# sourceMappingURL=delaunay-edges.d.ts.map