import styles from "./page.module.css";
import { getPost } from "@services/post";
import ViewIncrement from "./_components/ViewIncreasement";
import { evaluate, MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import RemarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import { mdxComponents } from "@components/mdx";
import TocComponent from "./_components/TocComponent";
import LoadingComponent from "./_components/LoadingComponent";
import rehypeSlug from "rehype-slug";
import SafeImage from "@components/SafeImage";
import Flex from "@components/Flex";
import { getCategoryLabel } from "@utils/categoryMapper";
import { getRelativeTime } from "@utils/formatDate";

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

type Scope = {
  toc?: TocItem[];
};

type Frontmatter = {
  title: string;
  author: string;
};

const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: "github-dark",
};

const options: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, [RemarkFlexibleToc, { skipLevels: [1] }]],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
  },
  vfileDataIntoScope: "toc",
};

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = await getPost({ category, slug });

  const { content, scope, error } = await evaluate<Frontmatter, Scope>({
    source: post.content,
    options,
    components: mdxComponents,
  });

  return (
    <>
      <ViewIncrement postId={post.id} />

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.thumbnailWrapper}>
            <SafeImage alt="thumbnail" src={post.metadata.thumbnailUrl} fill />
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <Flex gap="md">
            <p>{getCategoryLabel(post.categories?.name || "")}</p>
            <Flex gap="xs">
              <span>조회수 {post.view_count!.toLocaleString()}회</span>
              <span>•</span>
              <time dateTime={post.published_at!}>
                {getRelativeTime(post.published_at!)}
              </time>
            </Flex>
          </Flex>
        </header>

        <TocComponent toc={scope.toc || []} />
        <Suspense fallback={<LoadingComponent />}>
          {error ? (
            <div>포스트를 불러오는 중 문제가 발생했습니다.</div>
          ) : (
            content
          )}
        </Suspense>
      </article>
    </>
  );
}
