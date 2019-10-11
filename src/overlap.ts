import _ from 'lodash';
import { left, right } from './box';
import { Edge, Node } from './graph';
import { NodeMap } from './node-map';
import { normX, normY } from './point';

const EPSILON = Math.pow(10, -12);
const PADDING = 0;
type Options = {
  padding?: number;
  epsilon?: number;
};

const defaultOptions = { padding: PADDING, epsilon: EPSILON };

/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap
 */
export function overlap(
  n1: Node,
  n2: Node,
  options: Options = defaultOptions
): boolean {
  return overlapX(n1, n2, options) && overlapY(n1, n2, options);
}

/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap on x
 */
export function overlapX(
  n1: Node,
  n2: Node,
  { padding = PADDING, epsilon = EPSILON }: Options = defaultOptions
): boolean {
  return normX(n1, n2) - ((n1.width + n2.width) / 2 + +padding) < epsilon;
}

/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap on y
 */
export function overlapY(
  n1: Node,
  n2: Node,
  { padding = PADDING, epsilon = EPSILON }: Options = defaultOptions
): boolean {
  return normY(n1, n2) - ((n1.height + n2.height) / 2 + +padding) < epsilon;
}

/**
 * @param nodes
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if at least two nodes of the list overlap
 */
export function hasOverlap(
  nodes: Node[],
  options: Options = defaultOptions
): boolean {
  const { padding = PADDING } = options;
  let lap = false;
  const sorted = _.sortBy(nodes, node => left(node));

  _.forEach(sorted, (n1, index) => {
    for (let j = index + 1; j < nodes.length; j++) {
      const n2 = sorted[j];

      if (overlap(n1, n2, options)) {
        lap = true;
        return false; // exit _.forEach
      } else if (left(n2) > right(n1) + padding) break;
    }
  });

  return lap;
}

/**
 * Get all the overlaps between couple of nodes
 * @param map map of nodes having their index as keys
 * @param edges
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 */
export function edgeOverlap(
  map: NodeMap,
  edges: Edge[],
  options: Options = defaultOptions
): boolean {
  let present = false;
  _.forEach(edges, edge => {
    if (overlap(map[edge.source], map[edge.target], options)) {
      present = true;
      return false;
    }
  });
  return present;
}

/**
 * @param nodes
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns the list of all overlaps of the graph.
 */
export function getAllOverlaps(
  nodes: Node[],
  options: Options = defaultOptions
): Node[][] {
  const { padding = PADDING } = options;

  const sorted = _.sortBy(nodes, node => left(node));
  const overlaps: Node[][] = [];

  _.forEach(sorted, (n1, index) => {
    for (let j = index + 1; j < nodes.length; j++) {
      const n2 = sorted[j];

      if (overlap(n1, n2, options)) overlaps.push([n1, n2]);
      else if (left(n2) > right(n1) + padding) break;
    }
  });

  return overlaps;
}
