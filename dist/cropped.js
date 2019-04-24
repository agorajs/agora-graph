"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var box_1 = require("./box");
function crop(graph) {
    var minX = box_1.left(box_1.left(graph.nodes));
    var minY = box_1.top(box_1.top(graph.nodes));
    lodash_1.default.forEach(graph.nodes, function (n) {
        n.x -= minX;
        n.y -= minY;
    });
    return graph;
}
exports.crop = crop;
