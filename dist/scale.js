"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param initial
 * @param frame
 *
 * @returns function which converts the coordinate for the projection
 */
function createScale(initial, frame) {
    var scale = function (initial) {
        return scale.ratio * initial;
    };
    scale.ratio = Math.min(frame.width / initial.width, frame.height / initial.height);
    return scale;
}
exports.createScale = createScale;
