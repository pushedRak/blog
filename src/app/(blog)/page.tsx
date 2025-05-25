import SafeImage from "@components/SafeImage";
import styles from "./page.module.css";
import { getPosts } from "@services/post";
import { getRelativeTime } from "@utils/formatDate";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogHomePage() {
  const posts = await getPosts({
    page: 1,
    limit: 10,
  });

  return (
    <div>
      <div>
        <h1>최근 포스트</h1>
        <div className={styles.postsContainer}>
          {posts.map((post) => (
            <Link key={post.id} href={`/${post.categories?.name}/${post.slug}`}>
              <div className={styles.imageWrapper}>
                <SafeImage
                  alt="thumbnail"
                  src={post.metadata.thumbnailUrl}
                  fill
                />
              </div>
              <div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postDescription}>
                  {post.metadata.description}
                </p>
                <div className={styles.postViewAndDate}>
                  <span>조회수 {post.view_count}회</span>
                  <span className={styles.date}>
                    {getRelativeTime(post.published_at)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
