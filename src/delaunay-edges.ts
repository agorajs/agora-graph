import Delaunator from 'delaunator'
import _ from 'lodash'
import { Edge, Node } from './graph'

export default delaunay

export function delaunay(nodes: Node[]): Edge[] {
  const del = Delaunator.from(nodes, node => node.x, node => node.y)
  const hastable: boolean[][] = []
  const triangles = _.chunk(del.triangles, 3)

  // create edges
  const edges: Edge<number>[] = []

  _.forEach(triangles, triangle => {
    triangle.sort((a, b) => +a - +b)

    const a = +triangle[0],
      b = +triangle[1],
      c = +triangle[2]

    if (addable(hastable, a, b))
      edges.push({
        source: nodes[a].index,
        target: nodes[b].index
      })

    if (addable(hastable, b, c))
      edges.push({
        source: nodes[b].index,
        target: nodes[c].index
      })
    if (addable(hastable, a, c))
      edges.push({
        source: nodes[a].index,
        target: nodes[c].index
      })
  })

  return _.sortBy(edges, ['source', 'target'])
}

function addable(hastable: boolean[][], i: number, j: number) {
  if (hastable[i] === void 0 || hastable[i][j] !== true) {
    if (!hastable[i]) hastable[i] = []
    hastable[i][j] = true
    return true
  }
  return false
}
