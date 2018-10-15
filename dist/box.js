"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
/**
 * diagonal length of the box
 * @param box
 */
function diagonal(box) {
    return Math.hypot(box.width, box.height);
}
exports.diagonal = diagonal;
function minX(node) {
    if (node instanceof Array)
        return lodash_1.default.minBy(node, function (v) { return minX(v); });
    return node.x - node.width / 2;
}
exports.minX = minX;
exports.left = minX;
function maxX(node) {
    if (node instanceof Array)
        return lodash_1.default.maxBy(node, function (v) { return maxX(v); });
    return node.x + node.width / 2;
}
exports.maxX = maxX;
exports.right = maxX;
function minY(node) {
    if (node instanceof Array)
        return lodash_1.default.minBy(node, function (v) { return minY(v); });
    return node.y - node.height / 2;
}
exports.minY = minY;
exports.top = minY;
function maxY(node) {
    if (node instanceof Array)
        return lodash_1.default.maxBy(node, function (v) { return maxY(v); });
    return node.y + node.height / 2;
}
exports.maxY = maxY;
exports.bottom = maxY;
function setHeight(n, yMin, yMax) {
    n.height = yMax - yMin;
    return n;
}
exports.setHeight = setHeight;
function setWidth(n, xMin, xMax) {
    n.width = xMax - xMin;
    return n;
}
exports.setWidth = setWidth;
function setMinY(n, yMin) {
    setHeight(n, yMin, maxY(n));
    n.y = n.height / 2 + yMin;
    return n;
}
exports.setMinY = setMinY;
exports.setTop = setMinY;
function setMaxY(n, yMax) {
    var yMin = minY(n);
    setHeight(n, yMin, yMax);
    n.y = n.height / 2 + yMin;
    return n;
}
exports.setMaxY = setMaxY;
exports.setBottom = setMaxY;
function setMinX(n, xMin) {
    setWidth(n, xMin, maxX(n));
    n.x = n.width / 2 + xMin;
    return n;
}
exports.setMinX = setMinX;
exports.setLeft = setMinX;
function setMaxX(n, xMax) {
    var xMin = minX(n);
    setWidth(n, xMin, xMax);
    n.x = n.width / 2 + xMin;
    return n;
}
exports.setMaxX = setMaxX;
exports.setRight = setMaxX;
