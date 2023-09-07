export type SchemaMap = Record<string, Schema>;

export type Schema = {
  type: JSConstructor;
  required?: boolean;
  default?: unknown;
  mock?: unknown;
  parser: (data: Record<string, unknown>) => unknown;
  description: string;
};

export const isSchema = (x: object): x is Schema => {
  return (
    typeof x === 'object' &&
    (x as Schema).type !== undefined &&
    (x as Schema).parser !== undefined
  );
};

type JSConstructor =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | FunctionConstructor
  | ObjectConstructor
  | ArrayConstructor
  | ErrorConstructor
  | DateConstructor;
