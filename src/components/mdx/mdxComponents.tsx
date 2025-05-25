import React from "react";
import { MDXComponents } from "next-mdx-remote-client";
import styles from "./mdxComponents.module.css";
import SafeImage from "@components/SafeImage";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 {...props} className={styles.heading1} />,
  h2: (props) => <h2 {...props} className={styles.heading2} />,
  h3: (props) => <h3 {...props} className={styles.heading3} />,
  h4: (props) => <h4 {...props} className={styles.heading4} />,
  p: (props) => <p {...props} className={styles.paragraph} />,
  a: (props) => <a {...props} className={styles.link} />,
  ul: (props) => <ul {...props} className={styles.unorderedList} />,
  ol: (props) => <ol {...props} className={styles.orderedList} />,
  li: (props) => <li {...props} className={styles.listItem} />,
  blockquote: (props) => (
    <blockquote {...props} className={styles.blockquote} />
  ),
  code: (props) => <code {...props} className={styles.inlineCode} />,
  pre: (props) => <pre {...props} className={styles.codeBlock} />,
  strong: (props) => <strong {...props} className={styles.strong} />,
  em: (props) => <em {...props} className={styles.emphasis} />,
  table: (props) => <table {...props} className={styles.table} />,
  thead: (props) => <thead {...props} className={styles.tableHead} />,
  tbody: (props) => <tbody {...props} className={styles.tableBody} />,
  tr: (props) => <tr {...props} className={styles.tableRow} />,
  th: (props) => <th {...props} className={styles.tableHeader} />,
  td: (props) => <td {...props} className={styles.tableData} />,
  img: (props) => {
    const hasCaption = props.title;

    return (
      <figure className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <SafeImage {...props} className={styles.image} fill />
        </div>
        {hasCaption && (
          <figcaption className={styles.imageCaption}>{props.title}</figcaption>
        )}
      </figure>
    );
  },
  hr: (props) => <hr {...props} className={styles.divider} />,
};
