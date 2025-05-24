"use client";

import { Category } from "@customTypes/category";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getCategories } from "@services/category";
import { MDXClient, SerializeResult } from "next-mdx-remote-client";
import { serialize } from "next-mdx-remote-client/serialize";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const prettyCodeOptions: Options = {
  defaultLang: "terminal",
  keepBackground: true,
  theme: "github-dark",
};

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [mdxSource, setMdxSource] = useState<SerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  > | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const processMdx = async () => {
      if (content) {
        try {
          const mdxSource = await serialize({
            source: content,
            options: {
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, prettyCodeOptions],
                  rehypeSlug,
                ],
              },
            },
          });
          setMdxSource(mdxSource);
        } catch (error) {
          console.log("MDX 변환 오류:", error);
        }
      } else {
        setMdxSource(null);
      }
    };

    processMdx();
  }, [content]);

  const handleSubmit = async () => {
    if (!title || !categoryId || !content) {
      alert("제목, 카테고리, 내용을 모두 입력해주세요.");
      return;
    }

    const tagsArray = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const metadata = {
      description,
      thumbnailUrl,
      // 필요시 여기에 추가 필드 삽입 가능 (예: seoTitle, readTime 등)
    };

    const postData = {
      title,
      slug,
      content,
      categoryId,
      tags: tagsArray,
      metadata,
    };

    try {
      // 1. 임시 저장(초안 저장)
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "임시 저장에 실패했습니다.");
        console.log(error.detail);
        return;
      }

      const savedPost = await response.json();

      // 2. 발행 여부 확인 (예: 바로 발행 버튼 추가 시)
      const shouldPublish = window.confirm("글을 바로 발행하시겠습니까?");
      if (shouldPublish) {
        const publishRes = await fetch(`/api/posts/publish/${savedPost.id}`, {
          method: "PATCH",
        });

        if (!publishRes.ok) {
          const error = await publishRes.json();
          alert(error.message || "발행에 실패했습니다.");
          return;
        }

        alert("글이 성공적으로 발행되었습니다!");
        // 이동 등 추가 처리
      } else {
        alert("임시 저장되었습니다.");
      }
    } catch {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.titleContainer}>
          <input
            className={styles.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
        />
        <input
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="썸네일 Url"
        />
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="태그 (,로 구분)"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
        />
        <textarea
          className={styles.content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
        />
        <button onClick={handleSubmit}>작성하기</button>
      </div>
      <div className={styles.previewContainer}>
        {mdxSource && "compiledSource" in mdxSource && (
          <MDXClient {...mdxSource} />
        )}
      </div>
    </div>
  );
}
