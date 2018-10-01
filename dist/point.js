"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {Point} p1 first point
 * @param {Point} p2 second point
 *
 * @returns creates a vector (p1, p2) using p1,p2
 */
function delta(p1, p2) {
    return { x: deltaX(p1, p2), y: deltaY(p1, p2) };
}
exports.delta = delta;
exports.Δ = delta;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (x axis) between two points
 */
function deltaX(p1, p2) {
    return p2.x - p1.x;
}
exports.deltaX = deltaX;
exports.Δx = deltaX;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (y axis) between two points
 */
function deltaY(p1, p2) {
    return p2.y - p1.y;
}
exports.deltaY = deltaY;
exports.Δy = deltaY;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (x axis) between two points
 */
function normX(p1, p2) {
    return Math.abs(deltaX(p1, p2));
}
exports.normX = normX;
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (y axis) between two points
 */
function normY(p1, p2) {
    return Math.abs(deltaY(p1, p2));
}
exports.normY = normY;
/**
 * @returns Distance between two points
 * @param p1
 * @param p2
 */
function norm(p1, p2) {
    return Math.hypot(deltaX(p1, p2), deltaY(p1, p2));
}
exports.norm = norm;
