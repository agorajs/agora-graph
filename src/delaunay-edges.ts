import Delaunator from 'delaunator';
import _ from 'lodash';
import { Edge, Node } from './graph';
import { getAllOverlaps } from './overlap';

export default delaunay;

export function delaunay(nodes: Node[]): Edge[] {
  const del = Delaunator.from(nodes, node => node.x, node => node.y);
  const hastable: boolean[][] = [];
  const triangles = _.chunk(del.triangles, 3);

  // create edges
  const edges: Edge<number>[] = [];

  _.forEach(triangles, triangle => {
    triangle.sort((a, b) => +a - +b);

    const a = +triangle[0],
      b = +triangle[1],
      c = +triangle[2];

    if (addable(hastable, a, b))
      edges.push({
        source: nodes[a].index,
        target: nodes[b].index
      });

    if (addable(hastable, b, c))
      edges.push({
        source: nodes[b].index,
        target: nodes[c].index
      });
    if (addable(hastable, a, c))
      edges.push({
        source: nodes[a].index,
        target: nodes[c].index
      });
  });

  return _.sortBy(edges, ['source', 'target']);
}

function addable(hastable: boolean[][], i: number, j: number) {
  if (hastable[i] === void 0 || hastable[i][j] !== true) {
    if (!hastable[i]) hastable[i] = [];
    hastable[i][j] = true;
    return true;
  }
  return false;
}

/**
 * augment the delaunay triangulation with the overlaping nodes
 * @param nodes list of nodes
 * @param padding padding between nodes
 */
export function augmented(nodes: Node[], padding: number): Edge[] {
  return merge(delaunay(nodes), overlaps(nodes, padding));
}

/**
 * Get all overlaps of the list of nodes
 * @param nodes
 * @param padding
 */
function overlaps(nodes: Node[], padding: number): Edge[] {
  return _(getAllOverlaps(nodes, padding))
    .map(pair => {
      pair.sort((a, b) => a.index - b.index);
      return {
        source: pair[0].index,
        target: pair[1].index
      };
    })
    .sortBy(['source', 'target'])
    .value();
}

/**
 * Merging multiple edge list while removing redundancy
 * @param edges1
 * @param edges2
 */
function merge(edges1: Edge[], edges2: Edge[]): Edge[] {
  const [iterated, iteratee] =
    edges1.length <= edges2.length ? [edges1, edges2] : [edges2, edges1];

  const added: Edge[] = [];

  _.forEach(iterated, e1 => {
    let empty = true;
    _.forEach(iteratee, e2 => {
      if (e1.source === e2.source && e1.target === e2.target) {
        empty = false;
        return false;
      }
      if (
        (e1.source === e2.source && e1.target < e2.target) ||
        e1.source < e2.source
      ) {
        added.push(e1);
        empty = false;
        return false;
      }
    });

    if (empty) added.push(e1);
  });

  return _.concat(added, iteratee);
}
