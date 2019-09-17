import { PolarVector, CartesianVector } from './graph';
import { length } from './vector';

const ROUND_PRECISION = -14;

export function toCartesian(
  vector: PolarVector,
  precision: number = ROUND_PRECISION
): CartesianVector {
  return {
    x: round(vector.length * Math.cos(vector.theta), precision),
    y: round(vector.length * Math.sin(vector.theta), precision)
  };
}

export function toPolar(
  vector: CartesianVector,
  precision: number = ROUND_PRECISION
): PolarVector {
  let rad = Math.atan2(vector.y, vector.x);
  if (rad < 0) {
    rad = rad + 2 * Math.PI;
  }
  return {
    length: length(vector),
    theta: rad,
    angle: round((rad * 180) / Math.PI, precision)
  };
}

export function round(number: number, precision: number = 0): number {
  const multiplier = Math.pow(10, -precision);
  return Math.round(number * multiplier) / multiplier;
}
