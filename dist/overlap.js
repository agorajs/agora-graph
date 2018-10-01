"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var box_1 = require("./box");
var point_1 = require("./point");
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap
 */
function overlap(n1, n2, padding) {
    if (padding === void 0) { padding = 0; }
    return overlapX(n1, n2, padding) && overlapY(n1, n2, padding);
}
exports.overlap = overlap;
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap on x
 */
function overlapX(n1, n2, padding) {
    if (padding === void 0) { padding = 0; }
    return point_1.normX(n1, n2) < (n1.width + n2.width) / 2 + +padding;
}
exports.overlapX = overlapX;
/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns true if the nodes overlap on y
 */
function overlapY(n1, n2, padding) {
    if (padding === void 0) { padding = 0; }
    return point_1.normY(n1, n2) < (n1.height + n2.height) / 2 + +padding;
}
exports.overlapY = overlapY;
/**
 * @param nodes
 * @param padding
 * @returns true if at least two nodes of the list overlap
 */
function hasOverlap(nodes, padding) {
    if (padding === void 0) { padding = 0; }
    var lap = false;
    var sorted = lodash_1.default.sortBy(nodes, function (node) { return box_1.left(node); });
    lodash_1.default.forEach(sorted, function (n1, index) {
        for (var j = index + 1; j < nodes.length; j++) {
            var n2 = sorted[j];
            if (overlap(n1, n2, padding)) {
                lap = true;
                return false; // exit _.forEach
            }
            else if (box_1.left(n2) > box_1.right(n1) + padding)
                break;
        }
    });
    return lap;
}
exports.hasOverlap = hasOverlap;
/**
 * Get all the overlaps between couple of nodes
 * @param map map of nodes having their index as keys
 * @param edges
 * @param padding
 */
function edgeOverlap(map, edges, padding) {
    if (padding === void 0) { padding = 0; }
    var present = false;
    lodash_1.default.forEach(edges, function (edge) {
        if (overlap(map[edge.source], map[edge.target], padding)) {
            present = true;
            return false;
        }
    });
    return present;
}
exports.edgeOverlap = edgeOverlap;
/**
 * @param {Node[]} nodes
 * @param {number} [padding]
 *
 * @returns the list of all overlaps of the graph.
 */
function getAllOverlaps(nodes, padding) {
    if (padding === void 0) { padding = 0; }
    var sorted = lodash_1.default.sortBy(nodes, function (node) { return box_1.left(node); });
    var overlaps = [];
    lodash_1.default.forEach(sorted, function (n1, index) {
        for (var j = index + 1; j < nodes.length; j++) {
            var n2 = sorted[j];
            if (overlap(n1, n2, padding))
                overlaps.push([n1, n2]);
            else if (box_1.left(n2) > box_1.right(n1) + padding)
                break;
        }
    });
    return overlaps;
}
exports.getAllOverlaps = getAllOverlaps;
