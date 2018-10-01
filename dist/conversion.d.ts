import { PolarVector, CartesianVector } from './graph';
export declare function toCartesian(vector: PolarVector, precision?: number): CartesianVector;
export declare function toPolar(vector: CartesianVector, precision?: number): PolarVector;
export declare function round(number: number, precision?: number): number;
