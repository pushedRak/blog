import { getCategoryLabel } from "@utils/categoryMapper";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <div>
      <h1>{getCategoryLabel(category)}</h1>
    </div>
  );
}
