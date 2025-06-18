"use client";

import { useState } from "react";
import styles from "./MyRole.module.css";
import SafeImage from "@components/SafeImage";

type Media = {
  description: string;
  image?: { type: string; src: string };
};

interface MyRoleProps {
  myRole: Record<string, Media>;
}

export function MyRole({ myRole }: MyRoleProps) {
  const [selectedMedia, setSelectedMedia] = useState<Record<
    string,
    Media
  > | null>(null);

  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  return (
    <>
      <ul>
        {Object.entries(myRole).map(([roleName, media], index) => {
          const hasMedia = !!media.image;
          const roleClassName = hasMedia
            ? `${styles.roleItem} ${styles.roleItemClickable}`
            : `${styles.roleItem} ${styles.roleItemNonClickable}`;

          return (
            <li
              key={index}
              className={roleClassName}
              onClick={() => setSelectedMedia({ [roleName]: media })}
            >
              {roleName}
              {hasMedia && (
                <span className={styles.clickableIndicator}>📷</span>
              )}
            </li>
          );
        })}
      </ul>

      {selectedMedia &&
        (() => {
          const roleName = Object.keys(selectedMedia)[0];
          const media = selectedMedia[roleName];
          return (
            <div className={styles.mediaModal} onClick={closeMediaModal}>
              <div
                className={styles.mediaContent}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{roleName}</h2>
                <button
                  className={styles.closeButton}
                  onClick={closeMediaModal}
                >
                  ✕
                </button>
                <div className={styles.imageWrapper}>
                  {media.image && media.image.type === "image" ? (
                    <SafeImage
                      src={media.image.src}
                      alt={media.description}
                      className={styles.mediaElement}
                      fill
                    />
                  ) : media.image ? (
                    <video
                      src={media.image.src}
                      controls
                      autoPlay
                      className={styles.mediaElement}
                      onError={(e) => {
                        const img = document.createElement("img");
                        img.src = `/images/default-image.png`;
                        img.style.cssText = (
                          e.target as HTMLVideoElement
                        ).style.cssText;
                        const videoElement = e.target as HTMLVideoElement;
                        if (videoElement.parentNode) {
                          videoElement.parentNode.replaceChild(
                            img,
                            videoElement
                          );
                        }
                      }}
                    >
                      <source src={media.image.src} type="video/mp4" />
                      브라우저가 비디오를 지원하지 않습니다.
                    </video>
                  ) : null}
                </div>

                <div className={styles.mediaDescription}>
                  {media.description}
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
