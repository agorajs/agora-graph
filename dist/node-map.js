"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
function nodeMap(nodes) {
    var aggreg = {};
    lodash_1.default.forEach(nodes, function (node) {
        aggreg[node.index] = node;
    });
    return aggreg;
}
exports.nodeMap = nodeMap;
