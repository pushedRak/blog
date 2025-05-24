import { getPost } from "@services/post";
import ViewIncrement from "@components/ViewIncreasement";

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = await getPost({ category, slug });

  return (
    <>
      <ViewIncrement postId={post.id} />

      <article>
        <header>
          <h1>{post.title}</h1>

          <div>
            <span>{post.categories?.name}</span>
            <time dateTime={post.published_at!}>
              {new Date(post.published_at!).toLocaleDateString("ko-KR")}
            </time>
            <span>조회수 {post.view_count!.toLocaleString()}</span>
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
