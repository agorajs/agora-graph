import { CartesianVector } from './graph';
import { delta } from './point';
export { magnitude as length };
export { delta as vector };
/**
 * length of the vector
 * @param vector
 */
export declare function magnitude(vector: CartesianVector): number;
/**
 * Sums two vectors
 * @param v1
 * @param v2
 */
export declare function sum(v1: CartesianVector, v2: CartesianVector): CartesianVector;
/**
 * substract vector v1 - v2
 * @param v1
 * @param v2
 */
export declare function diff(v1: CartesianVector, v2: CartesianVector): CartesianVector;
/**
 * Scalar multiplication (mutable)
 *
 * @param v
 * @param k
 */
export declare function mult(v: CartesianVector, k: number): CartesianVector;
