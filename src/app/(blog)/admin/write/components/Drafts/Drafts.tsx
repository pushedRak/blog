import { useEffect, useState } from "react";
import styles from "./Drafts.module.css";
import { deleteDraftPost, DraftPost, getDraftPosts } from "@services/post";

interface DraftsProps {
  handleNewPost: () => void;
  setForm: ({
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
  }) => void;
  draftPosts: DraftPost[];
  setDraftPosts: React.Dispatch<React.SetStateAction<DraftPost[]>>;
  selectedDraftId: string;
  setSelectedDraftId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Drafts({
  handleNewPost,
  setForm,
  draftPosts,
  setDraftPosts,
  selectedDraftId,
  setSelectedDraftId,
}: DraftsProps) {
  const [showDrafts, setShowDrafts] = useState(false);

  const handleDraftSelect = (draft: DraftPost) => {
    // 폼 채우기
    setForm({
      title: draft.title,
      slug: draft.slug,
      content: draft.content,
      categoryId: draft.categoryId,
      tags: draft.tags.map((tag) => tag.name),
      description: draft.metadata?.description,
      thumbnailUrl: draft.metadata?.thumbnailUrl,
    });
    setSelectedDraftId(draft.id);
    setShowDrafts(false);
  };

  const handleDraftDelete = async (draftId: string) => {
    if (!window.confirm("이 임시 저장 게시글을 삭제하시겠습니까?")) return;

    try {
      await deleteDraftPost(draftId);
      setDraftPosts((prev) => prev.filter((draft) => draft.id !== draftId));

      if (selectedDraftId === draftId) {
        handleNewPost();
        setSelectedDraftId("");
      }

      alert("임시 저장 게시글이 삭제되었습니다.");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다."
      );
    }
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const drafts = await getDraftPosts();
        setDraftPosts(drafts);
      } catch (error) {
        console.error("임시 저장 게시글 로드 실패:", error);
      }
    };

    fetchDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.draftSection}>
      <div className={styles.draftHeader}>
        <p>임시 저장된 포스트 ({draftPosts.length}개)</p>
        <div>
          <button onClick={() => setShowDrafts(!showDrafts)}>
            {showDrafts ? "목록 숨기기" : "목록 보기"}
          </button>
          <button
            onClick={() => {
              handleNewPost();
              setSelectedDraftId("");
            }}
          >
            새 글 작성
          </button>
        </div>
      </div>

      {showDrafts && (
        <div className={styles.draftList}>
          {draftPosts.length === 0 ? (
            <p>임시 저장된 게시글이 없습니다.</p>
          ) : (
            draftPosts.map((draft) => (
              <div
                key={draft.id}
                className={`${styles.draftItem} ${
                  selectedDraftId === draft.id ? styles.selected : ""
                }`}
              >
                <div onClick={() => handleDraftSelect(draft)}>
                  <h4>{draft.title || "제목 없음"}</h4>
                  <p>
                    {new Date(
                      draft.updated_at || draft.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDraftDelete(draft.id);
                  }}
                  className={styles.deleteButton}
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
