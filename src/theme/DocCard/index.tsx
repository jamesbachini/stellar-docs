import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/plugin-content-docs/client';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import clsx from 'clsx';
import type {Props} from '@theme/DocCard';
import styles from './styles.module.css';

type DocCardItem = PropSidebarItemCategory | PropSidebarItemLink;

const ICON_RULES: Array<[RegExp, string]> = [
  [/x402/i, '402'],
  [/\bmpp\b|machine payments?/i, '$'],
  [/wallet|sep-?10|sep-?24|sep-?6|sep-?7|sep-?30|sep-?38/i, 'W'],
  [/payment|pay|transaction|transfer|disbursement/i, '$'],
  [/dapp|frontend|app|application/i, 'A'],
  [/guestbook|message/i, '"'],
  [/passkey|auth|sign/i, 'K'],
  [/smart.?contract|soroban|contract/i, '{}'],
  [/ingest|pipeline|indexer|data|query/i, 'D'],
  [/privacy|zk|proof/i, 'ZK'],
  [/anchor|deposit|withdrawal|quote/i, '<>'],
  [/asset|token|trust/i, 'T'],
  [/network|stellar/i, '*'],
  [/guide|tutorial|quickstart|setup|getting started/i, '>'],
  [/api|rpc|horizon/i, '/'],
];

function getSearchText(item: DocCardItem): string {
  const fields = [
    item.label,
    item.href,
    item.type === 'link' ? item.docId : undefined,
    item.description,
  ];

  return fields.filter(Boolean).join(' ');
}

function getFallbackIcon(item: DocCardItem): string {
  const searchText = getSearchText(item);
  const matchedRule = ICON_RULES.find(([pattern]) => pattern.test(searchText));

  if (matchedRule) {
    return matchedRule[1];
  }

  if (item.type === 'category') {
    return '#';
  }

  return isInternalUrl(item.href) ? 'doc' : '↗';
}

function getIconTitle(item: DocCardItem): {icon: string; title: string} {
  const extracted = extractLeadingEmoji(item.label);

  return {
    icon: extracted.emoji ?? getFallbackIcon(item),
    title: extracted.rest.trim(),
  };
}

function CardLayout({
  item,
  href,
  title,
  icon,
  description,
}: {
  item: DocCardItem;
  href: string;
  title: string;
  icon: string;
  description?: string;
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx(
        'card',
        ThemeClassNames.docs.docCard.container,
        styles.cardContainer,
        item.className,
      )}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon} aria-hidden="true">
          {icon}
        </span>
        <h2
          className={clsx(ThemeClassNames.docs.docCard.heading, styles.cardTitle)}
          title={title}>
          {title}
        </h2>
      </div>
      <hr className={styles.cardRule} />
      {description && (
        <p
          className={clsx(
            ThemeClassNames.docs.docCard.description,
            styles.cardDescription,
          )}
          title={description}>
          {description}
        </p>
      )}
    </Link>
  );
}

function CardCategory({item}: {item: Extract<DocCardItem, {type: 'category'}>}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();

  if (!href) {
    return null;
  }

  return (
    <CardLayout
      item={item}
      href={href}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      {...getIconTitle(item)}
    />
  );
}

function CardLink({item}: {item: Extract<DocCardItem, {type: 'link'}>}) {
  const doc = useDocById(item.docId ?? undefined);

  return (
    <CardLayout
      item={item}
      href={item.href}
      description={item.description ?? doc?.description}
      {...getIconTitle(item)}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
