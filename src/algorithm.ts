import { Graph } from './graph';

export interface Function<T> {
  (graph: Graph, options?: T): Result;
}

export interface Algorithm<T> {
  name: string;
  algorithm: Function<T>;
  options?: T;
}

export interface Result {
  graph: Graph;
  errors?: string[];
  benchmark?: { [key: string]: any };
  data?: { [key: string]: any };
}

export interface ExpandedResult<T> extends Result {
  algorithm: string;
  options?: T;
}

export function createFunction<T>(
  f: (graph: Graph, options?: T) => Result
): Function<T> {
  return f;
}
