import _ from 'lodash'
import { Node, CartesianVector, Graph, Edge } from './graph'
import { left, right } from './box'
import { Δx, Δy, normX, normY } from './point'
import { NodeMap } from './node-map'

/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap
 */
export function overlap(n1: Node, n2: Node, padding: number = 0): boolean {
  return overlapX(n1, n2, padding) && overlapY(n1, n2, padding)
}

/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap on x
 */
export function overlapX(n1: Node, n2: Node, padding: number = 0): boolean {
  return normX(n1, n2) < (n1.width + n2.width) / 2 + +padding
}

/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap on y
 */
export function overlapY(n1: Node, n2: Node, padding: number = 0): boolean {
  return normY(n1, n2) < (n1.height + n2.height) / 2 + +padding
}

/**
 * @param nodes
 * @param padding
 * @returns true if at least two nodes of the list overlap
 */
export function hasOverlap(nodes: Node[], padding: number = 0): boolean {
  let lap = false
  const sorted = _.sortBy(nodes, node => left(node))

  _.forEach(sorted, (n1, index) => {
    for (let j = index + 1; j < nodes.length; j++) {
      const n2 = sorted[j]

      if (overlap(n1, n2, padding)) {
        lap = true
        return false // exit _.forEach
      } else if (left(n2) > right(n1) + padding) break
    }
  })

  return lap
}

/**
 * Get all the overlaps between couple of nodes
 * @param map map of nodes having their index as keys
 * @param edges
 * @param padding
 */
export function edgeOverlap(
  map: NodeMap,
  edges: Edge[],
  padding: number = 0
): boolean {
  let present = false
  _.forEach(edges, edge => {
    if (overlap(map[edge.source], map[edge.target], padding)) {
      present = true
      return false
    }
  })
  return present
}

/**
 * @param {Node[]} nodes
 * @param {number} [padding]
 *
 * @returns the list of all overlaps of the graph.
 */
export function getAllOverlaps(nodes: Node[], padding: number = 0): Node[][] {
  const sorted = _.sortBy(nodes, node => left(node))
  const overlaps: Node[][] = []

  _.forEach(sorted, (n1, index) => {
    for (let j = index + 1; j < nodes.length; j++) {
      const n2 = sorted[j]

      if (overlap(n1, n2, padding)) overlaps.push([n1, n2])
      else if (left(n2) > right(n1) + padding) break
    }
  })

  return overlaps
}
