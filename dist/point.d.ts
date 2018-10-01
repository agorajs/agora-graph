import { Point, CartesianVector } from './graph';
export { deltaX as Δx, deltaY as Δy, delta as Δ };
/**
 * @param {Point} p1 first point
 * @param {Point} p2 second point
 *
 * @returns creates a vector (p1, p2) using p1,p2
 */
export declare function delta(p1: Point, p2: Point): CartesianVector;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (x axis) between two points
 */
export declare function deltaX(p1: Point, p2: Point): number;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (y axis) between two points
 */
export declare function deltaY(p1: Point, p2: Point): number;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (x axis) between two points
 */
export declare function normX(p1: Point, p2: Point): number;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (y axis) between two points
 */
export declare function normY(p1: Point, p2: Point): number;
/**
 * @returns Distance between two points
 * @param p1
 * @param p2
 */
export declare function norm(p1: Point, p2: Point): number;
