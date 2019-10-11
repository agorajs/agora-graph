import { Box, Node } from './graph';
export { minY as top, maxX as right, maxY as bottom, minX as left, setMinY as setTop, setMaxX as setRight, setMaxY as setBottom, setMinX as setLeft };
/**
 * diagonal length of the box
 * @param box
 */
export declare function diagonal(box: Box): number;
/**
 * smallest x belonging to the node (the left border of the label box)
 * @param node
 */
export declare function minX(node: Node): number;
/**
 * smallest x belonging to the node list (the left border of the label box)
 * @param node
 */
export declare function minX(nodes: Node[]): Node;
/** biggest x belonging to the node (the rigth border of the label box)
 * @param node
 */
export declare function maxX(node: Node): number;
/** biggest x belonging to the node list (the rigth border of the label box)
 * @param node
 */
export declare function maxX(nodes: Node[]): Node;
/**
 * smallest y belonging to the node (the top border of the label box)
 * @param node
 */
export declare function minY(node: Node): number;
/**
 * smallest y belonging to the node list (the top border of the label box)
 * @param node
 */
export declare function minY(nodes: Node[]): Node;
/**
 * biggest y belonging to the node (the bottom border of the label box)
 * @param node
 */
export declare function maxY(node: Node): number;
/**
 * biggest y belonging to the node list (the bottom border of the label box)
 * @param node
 */
export declare function maxY(nodes: Node[]): Node;
export declare function setHeight(n: Node, yMin: number, yMax: number): Node;
export declare function setWidth(n: Node, xMin: number, xMax: number): Node;
export declare function setMinY(n: Node, yMin: number): Node;
export declare function setMaxY(n: Node, yMax: number): Node;
export declare function setMinX(n: Node, xMin: number): Node;
export declare function setMaxX(n: Node, xMax: number): Node;
