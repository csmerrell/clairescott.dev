import { SchemaMap, isSchemaMap } from '@/model/data/Schema';

export const translateData = (
  payload: Record<string, unknown> | null,
  dataSchema: SchemaMap,
  isMock: boolean
) => {
  const result = {} as Record<string, unknown>;
  if (isMock) {
    Object.entries(dataSchema).forEach(([key, val]) => {
      if (isSchemaMap(val)) {
        result[key] = translateData(null, val, true);
      } else if (val.mock !== undefined) {
        result[key] = val.mock;
      } else if (dataSchema.default !== undefined) {
        result[key] = val.default;
      }
    });
  } else {
    console.log(payload);
    //to be implemented
  }

  return result;
};
