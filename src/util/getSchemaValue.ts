import { AnySchema } from "joi";

const getSchemaValue = (
  schema: AnySchema,
  value: Record<string, unknown>
): Record<string, unknown> => {
  // 從schema獲取所有欄位
  const fields = Object.keys(schema.describe().keys);
  // 整理需要的欄位給後端
  const newValue = fields.reduce(
    (prev: Record<string, unknown>, curr: string) => {
      prev[curr] = value[curr];
      return prev;
    },
    {}
  );

  return newValue;
};

export default getSchemaValue;
