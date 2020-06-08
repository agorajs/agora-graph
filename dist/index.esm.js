import _ from 'lodash';
import Delaunator from 'delaunator';

function createFunction(f) {
  return f;
}

/**
 * diagonal length of the box
 * @param box
 */

function diagonal(box) {
  return Math.hypot(box.width, box.height);
}
/**
 * smallest x belonging to the node (the left border of the label box)
 * @param node
 */

function minX(node) {
  if (node instanceof Array) return _.minBy(node, function (v) {
    return minX(v);
  });
  return node.x - node.width / 2;
}
/** biggest x belonging to the node (the rigth border of the label box)
 * @param node
 */

function maxX(node) {
  if (node instanceof Array) return _.maxBy(node, function (v) {
    return maxX(v);
  });
  return node.x + node.width / 2;
}
/**
 * smallest y belonging to the node (the top border of the label box)
 * @param node
 */

function minY(node) {
  if (node instanceof Array) return _.minBy(node, function (v) {
    return minY(v);
  });
  return node.y - node.height / 2;
}
/**
 * biggest y belonging to the node (the bottom border of the label box)
 * @param node
 */

function maxY(node) {
  if (node instanceof Array) return _.maxBy(node, function (v) {
    return maxY(v);
  });
  return node.y + node.height / 2;
}
function setHeight(n, yMin, yMax) {
  n.height = yMax - yMin;
  return n;
}
function setWidth(n, xMin, xMax) {
  n.width = xMax - xMin;
  return n;
}
function setMinY(n, yMin) {
  setHeight(n, yMin, maxY(n));
  n.y = n.height / 2 + yMin;
  return n;
}
function setMaxY(n, yMax) {
  var yMin = minY(n);
  setHeight(n, yMin, yMax);
  n.y = n.height / 2 + yMin;
  return n;
}
function setMinX(n, xMin) {
  setWidth(n, xMin, maxX(n));
  n.x = n.width / 2 + xMin;
  return n;
}
function setMaxX(n, xMax) {
  var xMin = minX(n);
  setWidth(n, xMin, xMax);
  n.x = n.width / 2 + xMin;
  return n;
}

/**
 * @param {Point} p1 first point
 * @param {Point} p2 second point
 *
 * @returns creates a vector (p1, p2) using p1,p2
 */

function delta(p1, p2) {
  return {
    x: deltaX(p1, p2),
    y: deltaY(p1, p2)
  };
}
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (x axis) between two points
 */

function deltaX(p1, p2) {
  return p2.x - p1.x;
}
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the Δ (y axis) between two points
 */

function deltaY(p1, p2) {
  return p2.y - p1.y;
}
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (x axis) between two points
 */

function normX(p1, p2) {
  return Math.abs(deltaX(p1, p2));
}
/**
 * @param {Point} p1
 * @param {Point} p2
 *
 * @returns {number} the norm (y axis) between two points
 */

function normY(p1, p2) {
  return Math.abs(deltaY(p1, p2));
}
/**
 * @returns Distance between two points
 * @param p1
 * @param p2
 */

function norm(p1, p2) {
  return Math.hypot(deltaX(p1, p2), deltaY(p1, p2));
}

/**
 * length of the vector
 * @param vector
 */

function magnitude(vector) {
  return Math.hypot(vector.x, vector.y);
}
/**
 * Sums two vectors
 * @param v1
 * @param v2
 */

function sum(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}
/**
 * substract vector v1 - v2
 * @param v1
 * @param v2
 */

function diff(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  };
}
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

var ROUND_PRECISION = -14;
function toCartesian(vector) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ROUND_PRECISION;
  return {
    x: round(vector.length * Math.cos(vector.theta), precision),
    y: round(vector.length * Math.sin(vector.theta), precision)
  };
}
function toPolar(vector) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ROUND_PRECISION;
  var rad = Math.atan2(vector.y, vector.x);

  if (rad < 0) {
    rad = rad + 2 * Math.PI;
  }

  return {
    length: magnitude(vector),
    theta: rad,
    angle: getAngle(rad, precision)
  };
}
function getAngle(theta) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ROUND_PRECISION;
  return round(theta * 180 / Math.PI, precision);
}
function round(number) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var multiplier = Math.pow(10, -precision);
  return Math.round(number * multiplier) / multiplier;
}

function crop(graph) {
  var minX$1 = minX(minX(graph.nodes));
  var minY$1 = minY(minY(graph.nodes));

  _.forEach(graph.nodes, function (n) {
    n.x -= minX$1;
    n.y -= minY$1;
  });

  return graph;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var EPSILON = Math.pow(10, -12);
var PADDING = 0;
var defaultOptions = {
  padding: PADDING,
  epsilon: EPSILON
};
/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap
 */

function overlap(n1, n2) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;
  return overlapX(n1, n2, options) && overlapY(n1, n2, options);
}
/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap on x
 */

function overlapX(n1, n2) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? PADDING : _ref$padding,
      _ref$epsilon = _ref.epsilon,
      epsilon = _ref$epsilon === void 0 ? EPSILON : _ref$epsilon;

  return normX(n1, n2) - ((n1.width + n2.width) / 2 + +padding) < epsilon;
}
/**
 * @param n1
 * @param n2
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if the nodes overlap on y
 */

function overlapY(n1, n2) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? PADDING : _ref2$padding,
      _ref2$epsilon = _ref2.epsilon,
      epsilon = _ref2$epsilon === void 0 ? EPSILON : _ref2$epsilon;

  return normY(n1, n2) - ((n1.height + n2.height) / 2 + +padding) < epsilon;
}
/**
 * @param nodes
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns true if at least two nodes of the list overlap
 */

function hasOverlap(nodes) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  var _options$padding = options.padding,
      padding = _options$padding === void 0 ? PADDING : _options$padding;
  var lap = false;

  var sorted = _.sortBy(nodes, function (node) {
    return minX(node);
  });

  _.forEach(sorted, function (n1, index) {
    for (var j = index + 1; j < nodes.length; j++) {
      var n2 = sorted[j];

      if (overlap(n1, n2, options)) {
        lap = true;
        return false; // exit _.forEach
      } else if (minX(n2) > maxX(n1) + padding) break;
    }
  });

  return lap;
}
/**
 * Get all the overlaps between couple of nodes
 * @param map map of nodes having their index as keys
 * @param edges
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 */

function edgeOverlap(map, edges) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;
  var present = false;

  _.forEach(edges, function (edge) {
    if (overlap(map[edge.source], map[edge.target], options)) {
      present = true;
      return false;
    }
  });

  return present;
}
/**
 * @param nodes
 * @param options.padding
 * @param options.epsilon accepted overlap value, really small, used for float imprecisions
 *
 * @returns the list of all overlaps of the graph.
 */

function getAllOverlaps(nodes) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  var _options$padding2 = options.padding,
      padding = _options$padding2 === void 0 ? PADDING : _options$padding2;

  var sorted = _.sortBy(nodes, function (node) {
    return minX(node);
  });

  var overlaps = [];

  _.forEach(sorted, function (n1, index) {
    for (var j = index + 1; j < nodes.length; j++) {
      var n2 = sorted[j];
      if (overlap(n1, n2, options)) overlaps.push([n1, n2]);else if (minX(n2) > maxX(n1) + padding) break;
    }
  });

  return overlaps;
}

function delaunay(nodes) {
  var del = Delaunator.from(nodes, function (node) {
    return node.x;
  }, function (node) {
    return node.y;
  });
  var hastable = [];

  var triangles = _.chunk(del.triangles, 3); // create edges


  var edges = [];

  _.forEach(triangles, function (triangle) {
    triangle.sort(function (a, b) {
      return +a - +b;
    });
    var a = +triangle[0],
        b = +triangle[1],
        c = +triangle[2];
    if (addable(hastable, a, b)) edges.push({
      source: nodes[a].index,
      target: nodes[b].index
    });
    if (addable(hastable, b, c)) edges.push({
      source: nodes[b].index,
      target: nodes[c].index
    });
    if (addable(hastable, a, c)) edges.push({
      source: nodes[a].index,
      target: nodes[c].index
    });
  });

  return _.sortBy(edges, ['source', 'target']);
}

function addable(hastable, i, j) {
  if (hastable[i] === void 0 || hastable[i][j] !== true) {
    if (!hastable[i]) hastable[i] = [];
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
/**
 * Get all overlaps of the list of nodes
 * @param nodes
 * @param padding
 */

function overlaps(nodes, padding) {
  return _(getAllOverlaps(nodes, padding)).map(function (pair) {
    pair.sort(function (a, b) {
      return a.index - b.index;
    });
    return {
      source: pair[0].index,
      target: pair[1].index
    };
  }).sortBy(['source', 'target']).value();
}
/**
 * Merging multiple edge list while removing redundancy
 * @param edges1
 * @param edges2
 */


function merge(edges1, edges2) {
  var _ref = edges1.length <= edges2.length ? [edges1, edges2] : [edges2, edges1],
      _ref2 = slicedToArray(_ref, 2),
      iterated = _ref2[0],
      iteratee = _ref2[1];

  var added = [];

  _.forEach(iterated, function (e1) {
    var empty = true;

    _.forEach(iteratee, function (e2) {
      if (e1.source === e2.source && e1.target === e2.target) {
        empty = false;
        return false;
      }

      if (e1.source === e2.source && e1.target < e2.target || e1.source < e2.source) {
        added.push(e1);
        empty = false;
        return false;
      }
    });

    if (empty) added.push(e1);
  });

  return _.concat(added, iteratee);
}

/**
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the closest position of n2 relative to n1 while avoiding overlapping, along the (n1,n2) line.
 */

function optimalVector(n1, n2) {
  var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  // optimal distance for each axis
  var desired = {
    x: +(n1.width + n2.width) / 2 + +padding,
    y: +(n1.height + n2.height) / 2 + +padding
  }; // distances

  var actual = delta(n1, n2);

  if (actual.x === 0 && actual.y === 0) {
    return {
      x: 0,
      y: 0
    };
  } // ratios


  var widthRatio = desired.x / actual.x,
      heightRatio = desired.y / actual.y;
  var unOverlapRatio = Math.min(Math.abs(widthRatio), Math.abs(heightRatio));
  return mult(actual, unOverlapRatio);
}
/**
 *
 * @param n1
 * @param n2
 * @param padding
 *
 * @returns the minimal vector between two nodes ; the closest position of n2 relative to n1 according his current position, while avoiding overlapping
 */

function minimalVector(n1, n2) {
  var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var Δx_n1n2 = deltaX(n1, n2);
  var Δy_n1n2 = deltaY(n1, n2);

  if (Δx_n1n2 <= Δy_n1n2) {
    return {
      x: Δx_n1n2 + 2 * padding,
      y: 0
    };
  } else {
    return {
      x: 0,
      y: Δy_n1n2 + 2 * padding
    };
  }
}

function nodeMap(nodes) {
  var aggreg = {};

  _.forEach(nodes, function (node) {
    aggreg[node.index] = node;
  });

  return aggreg;
}

/**
 *
 * @param initial
 * @param frame
 *
 * @returns function which converts the coordinate for the projection
 */
function createScale(initial, frame) {
  var scale = function scale(initial) {
    return scale.ratio * initial;
  };

  scale.ratio = Math.min(frame.width / initial.width, frame.height / initial.height);
  return scale;
}

export { augmented, maxY as bottom, createFunction, createScale, crop, delaunay, delta, deltaX, deltaY, diagonal, diff, edgeOverlap, getAllOverlaps, getAngle, hasOverlap, minX as left, magnitude as length, magnitude, maxX, maxY, minX, minY, minimalVector, mult, nodeMap, norm, normX, normY, optimalVector, overlap, overlapX, overlapY, maxX as right, round, setMaxY as setBottom, setHeight, setMinX as setLeft, setMaxX, setMaxY, setMinX, setMinY, setMaxX as setRight, setMinY as setTop, setWidth, sum, toCartesian, toPolar, minY as top, delta as vector, delta as Δ, deltaX as Δx, deltaY as Δy };
