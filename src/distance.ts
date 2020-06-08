import type { CartesianVector as Vector, Node } from './graph';
import { Δ, Δx, Δy } from './point';
import { mult } from './vector';

/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the closest position of n2 relative to n1 while avoiding overlapping, along the (n1,n2) line.
 */
export function optimalVector(n1: Node, n2: Node, padding: number = 0): Vector {
  // optimal distance for each axis
  const desired = {
    x: +(n1.width + n2.width) / 2 + +padding,
    y: +(n1.height + n2.height) / 2 + +padding,
  };

  // distances
  const actual = Δ(n1, n2);

  if (actual.x === 0 && actual.y === 0) {
    return { x: 0, y: 0 };
  }

  // ratios
  const widthRatio = desired.x / actual.x,
    heightRatio = desired.y / actual.y;

  let unOverlapRatio = Math.min(Math.abs(widthRatio), Math.abs(heightRatio));

  return mult(actual, unOverlapRatio);
}

/**
 *
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the minimal vector between two nodes ; the closest position of n2 relative to n1 according his current position, while avoiding overlapping
 */
export function minimalVector(n1: Node, n2: Node, padding: number = 0): Vector {
  const Δx_n1n2 = Δx(n1, n2);
  const Δy_n1n2 = Δy(n1, n2);

  if (Δx_n1n2 <= Δy_n1n2) {
    return { x: Δx_n1n2 + 2 * padding, y: 0 };
  } else {
    return { x: 0, y: Δy_n1n2 + 2 * padding };
  }
}
