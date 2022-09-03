export function sanitizeEnum<TEnum>(enumObject: Record<string | number, unknown>) {
  return Object.values(enumObject).filter(k => typeof k === "string") as (keyof TEnum)[]
}