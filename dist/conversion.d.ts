import type { CartesianVector, PolarVector } from './graph';
export declare function toCartesian(vector: PolarVector, precision?: number): CartesianVector;
export declare function toPolar(vector: CartesianVector, precision?: number): PolarVector;
export declare function getAngle(theta: number, precision?: number): number;
export declare function round(number: number, precision?: number): number;
//# sourceMappingURL=conversion.d.ts.map