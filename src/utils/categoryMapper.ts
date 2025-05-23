export const categoryTypeMap = {
  algorithm: "알고리즘",
  cs: "CS",
} as const;

export type CategoryType = keyof typeof categoryTypeMap;

export function getCategoryLabel(type: string): string {
  return categoryTypeMap[type as CategoryType] ?? type;
}
