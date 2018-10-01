import { Point, CartesianVector } from './graph'
import { delta } from './point'

export { magnitude as length }

export { delta as vector }

/**
 * length of the vector
 * @param vector
 */
export function magnitude(vector: CartesianVector): number {
  return Math.hypot(vector.x, vector.y)
}

/**
 * Sums two vectors
 * @param v1
 * @param v2
 */
export function sum(v1: CartesianVector, v2: CartesianVector): CartesianVector {
  return { x: v1.x + v2.x, y: v1.y + v2.y }
}

/**
 * substract vector v1 - v2
 * @param v1
 * @param v2
 */
export function diff(
  v1: CartesianVector,
  v2: CartesianVector
): CartesianVector {
  return { x: v1.x - v2.x, y: v1.y - v2.y }
}

/**
 * Scalar multiplication (mutable)
 *
 * @param v
 * @param k
 */
export function mult(v: CartesianVector, k: number): CartesianVector {
  v.x *= k
  v.y *= k
  return v
}
