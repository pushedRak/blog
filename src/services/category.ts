import { Category } from "@customTypes/category";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      next: { revalidate: 43200 },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result.detail);
    throw new Error(result.message || "카테고리 데이터를 불러오지 못했습니다.");
  }

  return result;
}
