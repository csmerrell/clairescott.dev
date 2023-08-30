export interface SchemaMap {
  [key: string]: Schema | SchemaMap;
}

export type Schema = {
  name: string;
  type: JSConstructor;
  required?: boolean;
  default?: unknown;
  mock?: unknown;
  parser: () => unknown;
  description: string;
};

export const isSchema = (x: object): x is Schema => {
  return (
    typeof x === 'object' &&
    (x as Schema).name !== undefined &&
    (x as Schema).type !== undefined &&
    (x as Schema).parser !== undefined
  );
};

export const isSchemaMap = (x: object): x is SchemaMap => {
  /**
   * This is not a perfect typeguard, but it works well enough.
   * If any descendant of x has a `parser` function, this returns true;
   * */

  if (typeof x !== 'object') return false;

  const found = Object.entries(x).find(([key, val]) => {
    return (key === 'parser' && typeof val == 'function') || isSchemaMap(val);
  });

  return found !== undefined;
};

type JSConstructor =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | FunctionConstructor
  | ObjectConstructor
  | ArrayConstructor
  | ErrorConstructor;
