"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./SafeImage.module.css";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  showLoadingIndicator?: boolean;
  showErrorMessage?: boolean;
  loadingType?: "dots" | "spinner" | "skeleton";
  onLoadComplete?: () => void;
  onError?: () => void;
}

function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return false;
  }

  if (url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) {
    return true;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidImageUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;

  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)(\?.*)?$/i;
  const isBase64 = url.startsWith("data:image/");

  return imageExtensions.test(url) || isBase64;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/images/default-image.png",
  fill,
  width,
  height,
  className = "",
  quality = 75,
  priority = false,
  sizes,
  showLoadingIndicator = true,
  showErrorMessage = false,
  loadingType = "dots",
  onLoadComplete,
  onError,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (src && isValidImageUrl(src)) {
      return src;
    }
    return fallbackSrc;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setHasTriedFallback(false);

    if (src && isValidImageUrl(src)) {
      setImgSrc(src);
    } else {
      setImgSrc(fallbackSrc);
      setError(true);
      setLoading(false);
      onError?.();
    }
  }, [src, fallbackSrc, onError]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    setLoading(false);

    if (!hasTriedFallback && imgSrc !== fallbackSrc) {
      setHasTriedFallback(true);
      setImgSrc(fallbackSrc);
      setLoading(true);
      return;
    }

    setError(true);
    onError?.();
  };

  const imageProps = fill
    ? { fill: true }
    : { width: width || 300, height: height || 200 };

  const containerClasses = `${styles.container} ${
    fill ? styles.containerFill : ""
  } ${className}`;

  const renderLoadingIndicator = () => {
    switch (loadingType) {
      case "spinner":
        return (
          <div className={styles.loadingIndicator}>
            <div className={styles.advancedSpinner}>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerText}>로딩 중...</div>
            </div>
          </div>
        );

      case "skeleton":
        return <div className={styles.skeletonLoader}></div>;

      case "dots":
      default:
        return (
          <div className={styles.loadingIndicator}>
            <div className={styles.loadingSpinner}>
              <div className={styles.loadingDot}></div>
              <div className={styles.loadingDot}></div>
              <div className={styles.loadingDot}></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      {/* 로딩 인디케이터 */}
      {loading && showLoadingIndicator && renderLoadingIndicator()}

      {/* 실제 이미지 */}
      <Image
        {...imageProps}
        src={imgSrc}
        alt={alt}
        quality={quality}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, 800px"}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${
          loading ? styles.imageLoading : styles.imageLoaded
        }`}
      />

      {/* 에러 메시지 */}
      {error && !loading && showErrorMessage && (
        <div className={styles.errorMessage}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>📷</div>
            <div className={styles.errorText}>이미지를 불러올 수 없습니다</div>
          </div>
        </div>
      )}
    </div>
  );
}
