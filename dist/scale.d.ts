import { Box } from './graph';
/**
 *
 * @param initial
 * @param frame
 *
 * @returns function which converts the coordinate for the projection
 */
export declare function createScale(initial: Box, frame: Box): (ref: number) => number;
