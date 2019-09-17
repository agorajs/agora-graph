import { Point, CartesianVector } from './graph';

export { deltaX as Δx, deltaY as Δy, delta as Δ };

/**
 * @param {Point} p1 first point
 * @param {Point} p2 second point
 *
 * @returns creates a vector (p1, p2) using p1,p2
 */
export function delta(p1: Point, p2: Point): CartesianVector {
  return { x: deltaX(p1, p2), y: deltaY(p1, p2) };
}

/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (x axis) between two points
 */
export function deltaX(p1: Point, p2: Point): number {
  return p2.x - p1.x;
}

/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (y axis) between two points
 */
export function deltaY(p1: Point, p2: Point): number {
  return p2.y - p1.y;
}

/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (x axis) between two points
 */
export function normX(p1: Point, p2: Point): number {
  return Math.abs(deltaX(p1, p2));
}

/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (y axis) between two points
 */
export function normY(p1: Point, p2: Point): number {
  return Math.abs(deltaY(p1, p2));
}

/**
 * @returns Distance between two points
 * @param p1
 * @param p2
 */
export function norm(p1: Point, p2: Point): number {
  return Math.hypot(deltaX(p1, p2), deltaY(p1, p2));
}
