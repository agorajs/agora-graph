"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var ROUND_PRECISION = -14;
function toCartesian(vector, precision) {
    if (precision === void 0) { precision = ROUND_PRECISION; }
    return {
        x: round(vector.length * Math.cos(vector.theta), precision),
        y: round(vector.length * Math.sin(vector.theta), precision)
    };
}
exports.toCartesian = toCartesian;
function toPolar(vector, precision) {
    if (precision === void 0) { precision = ROUND_PRECISION; }
    var rad = Math.atan2(vector.y, vector.x);
    if (rad < 0) {
        rad = rad + 2 * Math.PI;
    }
    return {
        length: vector_1.length(vector),
        theta: rad,
        angle: round(rad * 180 / Math.PI, precision)
    };
}
exports.toPolar = toPolar;
function round(number, precision) {
    if (precision === void 0) { precision = 0; }
    var multiplier = Math.pow(10, -precision);
    return Math.round(number * multiplier) / multiplier;
}
exports.round = round;
