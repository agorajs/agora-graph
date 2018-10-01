"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
exports.vector = point_1.delta;
/**
 * length of the vector
 * @param vector
 */
function magnitude(vector) {
    return Math.hypot(vector.x, vector.y);
}
exports.magnitude = magnitude;
exports.length = magnitude;
/**
 * Sums two vectors
 * @param v1
 * @param v2
 */
function sum(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
}
exports.sum = sum;
/**
 * substract vector v1 - v2
 * @param v1
 * @param v2
 */
function diff(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
}
exports.diff = diff;
/**
 * Scalar multiplication (mutable)
 *
 * @param v
 * @param k
 */
function mult(v, k) {
    v.x *= k;
    v.y *= k;
    return v;
}
exports.mult = mult;
