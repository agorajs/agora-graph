import { Box, Graph } from './graph'
import { right, bottom } from './box'

/**
 *
 * @param initial
 * @param frame
 *
 * @returns function which converts the coordinate for the projection
 */
export function createScale(initial: Box, frame: Box): (ref: number) => number {
  const scale: any = function(initial: number) {
    return scale.ratio * initial
  }

  scale.ratio = Math.min(
    frame.width / initial.width,
    frame.height / initial.height
  )

  return scale
}
