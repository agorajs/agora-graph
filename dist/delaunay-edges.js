"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var delaunator_1 = __importDefault(require("delaunator"));
var lodash_1 = __importDefault(require("lodash"));
var overlap_1 = require("./overlap");
exports.default = delaunay;
function delaunay(nodes) {
    var del = delaunator_1.default.from(nodes, function (node) { return node.x; }, function (node) { return node.y; });
    var hastable = [];
    var triangles = lodash_1.default.chunk(del.triangles, 3);
    // create edges
    var edges = [];
    lodash_1.default.forEach(triangles, function (triangle) {
        triangle.sort(function (a, b) { return +a - +b; });
        var a = +triangle[0], b = +triangle[1], c = +triangle[2];
        if (addable(hastable, a, b))
            edges.push({
                source: nodes[a].index,
                target: nodes[b].index
            });
        if (addable(hastable, b, c))
            edges.push({
                source: nodes[b].index,
                target: nodes[c].index
            });
        if (addable(hastable, a, c))
            edges.push({
                source: nodes[a].index,
                target: nodes[c].index
            });
    });
    return lodash_1.default.sortBy(edges, ['source', 'target']);
}
exports.delaunay = delaunay;
function addable(hastable, i, j) {
    if (hastable[i] === void 0 || hastable[i][j] !== true) {
        if (!hastable[i])
            hastable[i] = [];
        hastable[i][j] = true;
        return true;
    }
    return false;
}
/**
 * augment the delaunay triangulation with the overlaping nodes
 * @param nodes list of nodes
 * @param padding padding between nodes
 */
function augmented(nodes, padding) {
    return merge(delaunay(nodes), overlaps(nodes, padding));
}
exports.augmented = augmented;
/**
 * Get all overlaps of the list of nodes
 * @param nodes
 * @param padding
 */
function overlaps(nodes, padding) {
    return lodash_1.default(overlap_1.getAllOverlaps(nodes, padding))
        .map(function (pair) {
        pair.sort(function (a, b) { return a.index - b.index; });
        return {
            source: pair[0].index,
            target: pair[1].index
        };
    })
        .sortBy(['source', 'target'])
        .value();
}
/**
 * Merging multiple edge list while removing redundancy
 * @param edges1
 * @param edges2
 */
function merge(edges1, edges2) {
    var _a = edges1.length <= edges2.length ? [edges1, edges2] : [edges2, edges1], iterated = _a[0], iteratee = _a[1];
    var added = [];
    lodash_1.default.forEach(iterated, function (e1) {
        var empty = true;
        lodash_1.default.forEach(iteratee, function (e2) {
            if (e1.source === e2.source && e1.target === e2.target) {
                empty = false;
                return false;
            }
            if ((e1.source === e2.source && e1.target < e2.target) ||
                e1.source < e2.source) {
                added.push(e1);
                empty = false;
                return false;
            }
        });
        if (empty)
            added.push(e1);
    });
    return lodash_1.default.concat(added, iteratee);
}
