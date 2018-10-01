"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var delaunator_1 = __importDefault(require("delaunator"));
var lodash_1 = __importDefault(require("lodash"));
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
