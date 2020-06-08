import _ from 'lodash';
import type { Node } from './graph';

export interface NodeMap {
  [index: string]: Node;
}

export function nodeMap(nodes: Node[]) {
  const aggreg: NodeMap = {};

  _.forEach(nodes, (node) => {
    aggreg[node.index] = node;
  });

  return aggreg;
}
