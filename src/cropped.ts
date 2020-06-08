import _ from 'lodash';
import { left, top } from './box';
import type { Graph } from './graph';

export function crop(graph: Graph): Graph {
  let minX = left(left(graph.nodes));
  let minY = top(top(graph.nodes));

  _.forEach(graph.nodes, (n) => {
    n.x -= minX;
    n.y -= minY;
  });

  return graph;
}
