import { Node, Box } from './graph'
import _ from 'lodash'

export {
  minY as top,
  maxX as right,
  maxY as bottom,
  minX as left,
  setMinY as setTop,
  setMaxX as setRight,
  setMaxY as setBottom,
  setMinX as setLeft
}
/**
 * diagonal length of the box
 * @param box
 */
export function diagonal(box: Box): number {
  return Math.hypot(box.width, box.height)
}

/**
 * smallest x belonging to the node (the left border of the label box)
 * @param node
 */
export function minX(node: Node): number
/**
 * smallest x belonging to the node list (the left border of the label box)
 * @param node
 */
export function minX(nodes: Node[]): Node
export function minX(node: Node | Node[]): any {
  if (node instanceof Array) return _.minBy(node, v => minX(v))

  return node.x - node.width / 2
}

/** biggest x belonging to the node (the rigth border of the label box)
 * @param node
 */
export function maxX(node: Node): number
/** biggest x belonging to the node list (the rigth border of the label box)
 * @param node
 */
export function maxX(nodes: Node[]): Node
export function maxX(node: Node | Node[]): any {
  if (node instanceof Array) return _.maxBy(node, v => maxX(v))

  return node.x + node.width / 2
}

/**
 * smallest y belonging to the node (the top border of the label box)
 * @param node
 */
export function minY(node: Node): number
/**
 * smallest y belonging to the node list (the top border of the label box)
 * @param node
 */
export function minY(nodes: Node[]): Node
export function minY(node: Node | Node[]): any {
  if (node instanceof Array) return _.minBy(node, v => minY(v))

  return node.y - node.height / 2
}

/**
 * biggest y belonging to the node (the bottom border of the label box)
 * @param node
 */
export function maxY(node: Node): number
/**
 * biggest y belonging to the node list (the bottom border of the label box)
 * @param node
 */
export function maxY(nodes: Node[]): Node
export function maxY(node: Node | Node[]): any {
  if (node instanceof Array) return _.maxBy(node, v => maxY(v))

  return node.y + node.height / 2
}

export function setHeight(n: Node, yMin: number, yMax: number): Node {
  n.height = yMax - yMin
  return n
}

export function setWidth(n: Node, xMin: number, xMax: number): Node {
  n.width = xMax - xMin
  return n
}

export function setMinY(n: Node, yMin: number): Node {
  setHeight(n, yMin, maxY(n))
  n.y = n.height / 2 + yMin
  return n
}

export function setMaxY(n: Node, yMax: number): Node {
  const yMin = minY(n)
  setHeight(n, yMin, yMax)
  n.y = n.height / 2 + yMin
  return n
}

export function setMinX(n: Node, xMin: number): Node {
  setWidth(n, xMin, maxX(n))
  n.x = n.width / 2 + xMin
  return n
}

export function setMaxX(n: Node, xMax: number): Node {
  const xMin = minX(n)
  setWidth(n, xMin, xMax)
  n.x = n.width / 2 + xMin
  return n
}
