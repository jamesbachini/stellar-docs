import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import {
  findFirstSidebarItemLink,
  useDocById,
} from "@docusaurus/plugin-content-docs/client";
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { extractLeadingEmoji } from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import type { Props } from "@theme/DocCard";
import styles from "./styles.module.css";

type DocCardItem = PropSidebarItemCategory | PropSidebarItemLink;

function getTitle(item: DocCardItem): string {
  const extracted = extractLeadingEmoji(item.label);
  return extracted.rest.trim();
}

function getPageCount(items: PropSidebarItemCategory["items"]): number {
  return items.reduce((count, item) => {
    if (item.type === "link") {
      return count + 1;
    }

    if (item.type === "category") {
      return count + getPageCount(item.items);
    }

    return count;
  }, 0);
}

function findFirstSidebarDocId(
  items: PropSidebarItemCategory["items"],
): string | undefined {
  for (const item of items) {
    if (item.type === "link" && item.docId) {
      return item.docId;
    }

    if (item.type === "category") {
      const docId = findFirstSidebarDocId(item.items);
      if (docId) {
        return docId;
      }
    }
  }

  return undefined;
}

function CardLayout({
  item,
  href,
  title,
  description,
  meta,
}: {
  item: DocCardItem;
  href: string;
  title: string;
  description?: string;
  meta?: string;
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx(
        "card",
        ThemeClassNames.docs.docCard.container,
        styles.cardContainer,
        item.className,
      )}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon} aria-hidden="true" />
        <h2
          className={clsx(
            ThemeClassNames.docs.docCard.heading,
            styles.cardTitle,
          )}
          title={title}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={clsx(
            ThemeClassNames.docs.docCard.description,
            styles.cardDescription,
          )}
          title={description}
        >
          {description}
        </p>
      )}
      {meta ? <span className={styles.cardMeta}>{meta}</span> : null}
    </Link>
  );
}

function CardCategory({
  item,
}: {
  item: Extract<DocCardItem, { type: "category" }>;
}) {
  const href = findFirstSidebarItemLink(item);
  const landingDoc = useDocById(findFirstSidebarDocId(item.items));
  const pageCount = getPageCount(item.items);

  if (!href) {
    return null;
  }

  return (
    <CardLayout
      item={item}
      href={href}
      title={getTitle(item)}
      description={item.description ?? landingDoc?.description}
      meta={`${pageCount} ${pageCount === 1 ? "page" : "pages"}`}
    />
  );
}

function CardLink({ item }: { item: Extract<DocCardItem, { type: "link" }> }) {
  const doc = useDocById(item.docId ?? undefined);

  return (
    <CardLayout
      item={item}
      href={item.href}
      title={getTitle(item)}
      description={item.description ?? doc?.description}
      meta={isInternalUrl(item.href) ? undefined : "external"}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
