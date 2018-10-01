export interface Point {
    x: number;
    y: number;
}
export interface CartesianVector extends Point {
}
export interface PolarVector {
    length: number;
    theta: number;
    angle: number;
}
export interface Box {
    width: number;
    height: number;
}
export interface Node extends Point, Box {
    index: number;
    label: string;
    up?: {
        x: number;
        y: number;
        [key: string]: any;
    };
}
export interface Edge<T = number> {
    source: T;
    target: T;
}
export interface Graph<T = number> {
    nodes: Node[];
    edges: Edge<T>[];
}
