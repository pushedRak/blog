import { Category } from "@customTypes/category";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      next: { revalidate: 43200 },
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "카테고리 데이터를 불러오지 못했습니다.");
  }

  return result;
}
