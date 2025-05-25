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
import { mdxComponents } from "@components/mdx";
import {
  createPost,
  DraftPost,
  getDraftPosts,
  publishPost,
  updateDraftPost,
} from "@services/post";
import Drafts from "./components/Drafts";

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

  const [draftPosts, setDraftPosts] = useState<DraftPost[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string>("");

  const handleNewPost = () => {
    setTitle("");
    setSlug("");
    setContent("");
    setCategoryId("");
    setTag("");
    setDescription("");
    setThumbnailUrl("");
  };

  const setForm = ({
    title,
    slug,
    content,
    categoryId,
    tags,
    description,
    thumbnailUrl,
  }: {
    title: string;
    slug: string;
    content: string;
    categoryId: string;
    tags: string[];
    description?: string;
    thumbnailUrl?: string;
  }) => {
    setTitle(title);
    setSlug(slug);
    setContent(content);
    setCategoryId(categoryId);
    setTag(tags.join(", "));
    setDescription(description || "");
    setThumbnailUrl(thumbnailUrl || "");
  };

  const handleSubmit = async () => {
    const tagsArray = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const postData = {
      title,
      slug,
      content,
      categoryId,
      tags: tagsArray,
      metadata: {
        description,
        thumbnailUrl,
      },
    };

    if (!selectedDraftId) {
      try {
        // 1. 임시 저장
        const savedPost = await createPost(postData);

        // 2. 발행 여부 확인
        const shouldPublish = window.confirm("글을 바로 발행하시겠습니까?");

        if (shouldPublish) {
          await publishPost(savedPost.id);
          alert("글이 성공적으로 발행되었습니다!");
        } else {
          alert("임시 저장되었습니다.");
        }
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "저장 중 오류가 발생했습니다."
        );
      }

      return;
    }

    try {
      // 1. 수정
      const updatedPost = await updateDraftPost(selectedDraftId, postData);

      // 2. 발행 여부 확인
      const shouldPublish = window.confirm("글을 바로 발행하시겠습니까?");

      if (shouldPublish) {
        await publishPost(updatedPost.id);
        alert("글이 성공적으로 발행되었습니다!");
      } else {
        alert("수정되었습니다.");
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "수정 중 오류가 발생했습니다."
      );
    }

    // 목록 새로고침
    const updatedDrafts = await getDraftPosts();
    setDraftPosts(updatedDrafts);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 로드 실패:", error);
      }
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

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Drafts
          handleNewPost={handleNewPost}
          setForm={setForm}
          draftPosts={draftPosts}
          setDraftPosts={setDraftPosts}
          selectedDraftId={selectedDraftId}
          setSelectedDraftId={setSelectedDraftId}
        />
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
          <MDXClient {...mdxSource} components={mdxComponents} />
        )}
      </div>
    </div>
  );
}
