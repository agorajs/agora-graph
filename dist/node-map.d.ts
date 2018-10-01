import { Node } from './graph';
export interface NodeMap {
    [index: string]: Node;
}
export declare function nodeMap(nodes: Node[]): NodeMap;
