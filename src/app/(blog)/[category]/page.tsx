export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <div>
      <h1>{category}</h1>
    </div>
  );
}
