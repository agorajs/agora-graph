"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var vector_1 = require("./vector");
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the closest position of n2 relative to n1 while avoiding overlapping, along the (n1,n2) line.
 */
function optimalVector(n1, n2, padding) {
    if (padding === void 0) { padding = 0; }
    // optimal distance for each axis
    var desired = {
        x: +(n1.width + n2.width) / 2 + +padding,
        y: +(n1.height + n2.height) / 2 + +padding
    };
    // distances
    var actual = point_1.Δ(n1, n2);
    if (actual.x === 0 && actual.y === 0) {
        return { x: 0, y: 0 };
    }
    // ratios
    var widthRatio = desired.x / actual.x, heightRatio = desired.y / actual.y;
    var unOverlapRatio = Math.min(Math.abs(widthRatio), Math.abs(heightRatio));
    return vector_1.mult(actual, unOverlapRatio);
}
exports.optimalVector = optimalVector;
/**
 *
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the minimal vector between two nodes ; the closest position of n2 relative to n1 according his current position, while avoiding overlapping
 */
function minimalVector(n1, n2, padding) {
    if (padding === void 0) { padding = 0; }
    var Δx_n1n2 = point_1.Δx(n1, n2);
    var Δy_n1n2 = point_1.Δy(n1, n2);
    if (Δx_n1n2 <= Δy_n1n2) {
        return { x: Δx_n1n2 + 2 * padding, y: 0 };
    }
    else {
        return { x: 0, y: Δy_n1n2 + 2 * padding };
    }
}
exports.minimalVector = minimalVector;
