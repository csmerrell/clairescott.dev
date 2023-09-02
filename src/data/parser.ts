import { SchemaMap, isSchemaMap } from '@/model/data/Schema';

export type ParseParams = {
  rawData?: Record<string, unknown>;
  schemata: SchemaMap;
  isMock?: boolean;
};

export const parseData = (e: ParseParams) => {
  const result = {} as Record<string, unknown>;
  if (e.isMock || e.rawData === undefined) {
    Object.entries(e.schemata).forEach(([key, schema]) => {
      if (schema.mock !== undefined) {
        result[key] = schema.mock;
      } else if (schema.default !== undefined) {
        result[key] = schema.default;
      }
    });
  } else {
    console.log(e.rawData);
    //to be implemented
  }

  return result;
};
