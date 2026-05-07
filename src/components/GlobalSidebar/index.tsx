import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import navbarItems from '@site/config/theme/navbar';
import styles from './styles.module.css';

type SidebarEntry = {
  label: string;
  to?: string;
  href?: string;
  type?: string;
  value?: string;
  docId?: string;
  sidebarId?: string;
};

type SidebarSection = {
  key: string;
  label: string;
  to: string;
  items: SidebarEntry[];
};

const sections: SidebarSection[] = [
  navbarItems.build,
  navbarItems.learn,
  navbarItems.tokens,
  navbarItems.data,
  navbarItems.tools,
  navbarItems.networks,
  navbarItems.validators,
].map((item) => ({
  key: item.label.toLowerCase(),
  label: item.label,
  to: item.to,
  items: item.items ?? [],
}));

const platformSidebarLinks: Record<string, string> = {
  anchor_platform: '/docs/platforms/anchor-platform',
  stellar_disbursement_platform: '/docs/platforms/stellar-disbursement-platform',
};

function normalizePath(path?: string) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return path.startsWith('/') ? path : `/${path}`;
}

function docIdToPath(docId?: string) {
  if (!docId) return undefined;
  const normalized = docId.replace(/\/README$/, '');
  return `/docs/${normalized}`;
}

function htmlEntryToLink(entry: SidebarEntry) {
  if (!entry.value) return null;

  const href = entry.value.match(/href="([^"]+)"/)?.[1];
  const label =
    entry.value.match(/<small>(.*?)<\/small>/)?.[1] ??
    entry.value.match(/>([^<>]+)<\/a>/)?.[1] ??
    entry.value.replace(/<[^>]+>/g, '').trim();

  if (!label) return null;

  return {
    label,
    to: normalizePath(href),
  };
}

function resolveEntry(entry: SidebarEntry) {
  if (entry.type === 'html') return htmlEntryToLink(entry);
  if (entry.type === 'doc') {
    return {
      label: entry.label,
      to: docIdToPath(entry.docId),
    };
  }
  if (entry.type === 'docSidebar') {
    return {
      label: entry.label,
      to: entry.sidebarId ? platformSidebarLinks[entry.sidebarId] : undefined,
    };
  }

  return {
    label: entry.label,
    to: normalizePath(entry.to ?? entry.href),
  };
}

function isActive(pathname: string, target?: string) {
  if (!target || /^https?:\/\//.test(target)) return false;
  return pathname === target || pathname.startsWith(`${target}/`);
}

function pathsMatch(first?: string, second?: string) {
  if (!first || !second) return false;
  return first.replace(/\/$/, '') === second.replace(/\/$/, '');
}

export default function GlobalSidebar() {
  const { pathname } = useLocation();
  const activeSection = useMemo(() => {
    return sections.find((section) => isActive(pathname, section.to))?.key;
  }, [pathname]);
  const [openSection, setOpenSection] = useState(activeSection ?? '');

  return (
    <aside className={styles.sidebar} aria-label="Documentation navigation">
      <nav className={styles.nav}>
        {sections.map((section) => {
          const isOpen = openSection === section.key;
          const sectionIsActive = activeSection === section.key;
          const sectionItems = section.items.filter((entry) => {
            const resolved = resolveEntry(entry);
            return !pathsMatch(resolved?.to, section.to);
          });
          const buttonClassName = [
            styles.sectionButton,
            isOpen && styles.sectionButtonOpen,
            sectionIsActive && styles.sectionButtonActive,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div className={styles.section} key={section.key}>
              <button
                type="button"
                className={buttonClassName}
                onClick={() => setOpenSection(isOpen ? '' : section.key)}
                aria-expanded={isOpen}
              >
                <span>{section.label}</span>
                <span className={styles.caret} aria-hidden="true" />
              </button>

              {isOpen ? (
                <div className={styles.submenu}>
                  <Link
                    className={[
                      styles.link,
                      pathsMatch(pathname, section.to) && styles.linkActive,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    to={section.to}
                  >
                    Overview
                  </Link>
                  {sectionItems.map((entry, index) => {
                    const resolved = resolveEntry(entry);
                    if (!resolved) return null;
                    if (!resolved.to) {
                      return (
                        <span
                          className={styles.subheading}
                          key={`${section.key}-${index}`}
                        >
                          {resolved.label}
                        </span>
                      );
                    }

                    const external = /^https?:\/\//.test(resolved.to);
                    const linkClassName = [
                      styles.link,
                      isActive(pathname, resolved.to) && styles.linkActive,
                    ]
                      .filter(Boolean)
                      .join(' ');

                    return (
                      <Link
                        className={linkClassName}
                        href={external ? resolved.to : undefined}
                        key={`${section.key}-${index}`}
                        to={external ? undefined : resolved.to}
                      >
                        {resolved.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
