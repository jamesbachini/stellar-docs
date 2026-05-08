import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type AppPath = {
  title: string;
  href: string;
  description: string;
  eyebrow: string;
  meta: string;
};

const appPaths: AppPath[] = [
  {
    title: "Application fundamentals",
    href: "/docs/build/apps/overview",
    description:
      "Start with the core Stellar concepts behind wallets, payments, assets, anchors, and network access.",
    eyebrow: "Start here",
    meta: "Concepts",
  },
  {
    title: "Design considerations",
    href: "/docs/build/apps/application-design-considerations",
    description:
      "Compare custody models, account design, recovery, and security tradeoffs before you build.",
    eyebrow: "Plan",
    meta: "Architecture",
  },
  {
    title: "Wallet SDK",
    href: "/docs/build/apps/wallet/",
    description:
      "Build wallet flows for Stellar accounts, anchors, deposits, withdrawals, quotes, and signing.",
    eyebrow: "Build",
    meta: "Wallets",
  },
  {
    title: "Payment app with the JS SDK",
    href: "/docs/build/apps/example-application-tutorial/",
    description:
      "Create a complete Testnet payment app while learning accounts, trustlines, assets, and path payments.",
    eyebrow: "Tutorial",
    meta: "JavaScript",
  },
  {
    title: "Payment app with Swift",
    href: "/docs/build/apps/swift-payment-app",
    description:
      "Explore a native iOS payment app that uses Stellar payments and the Swift Wallet SDK.",
    eyebrow: "Tutorial",
    meta: "Swift",
  },
  {
    title: "Contract frontend templates",
    href: "/docs/build/apps/dapp-frontend",
    description:
      "Connect a frontend to smart contracts with generated bindings and template-based dapp workflows.",
    eyebrow: "Dapp",
    meta: "Frontend",
  },
  {
    title: "Passkey guestbook dapp",
    href: "/docs/build/apps/guestbook/",
    description:
      "Build a smart contract dapp with passkey-powered smart wallets and a working web frontend.",
    eyebrow: "Dapp",
    meta: "Passkeys",
  },
  {
    title: "Network ingestion pipeline",
    href: "/docs/build/apps/ingest-sdk/",
    description:
      "Use Stellar ingestion packages to stream, parse, and process ledger data for custom applications.",
    eyebrow: "Data",
    meta: "Go",
  },
];

const relatedPaths: AppPath[] = [
  {
    title: "Privacy on Stellar",
    href: "/docs/build/apps/privacy",
    description:
      "Learn how privacy pools, compliance-aware systems, and zero-knowledge tools fit into Stellar apps.",
    eyebrow: "Privacy",
    meta: "ZK",
  },
  {
    title: "All tutorials",
    href: "/docs/build/tutorials",
    description:
      "Browse the full tutorial index across smart contracts, apps, agentic payments, and data pipelines.",
    eyebrow: "Index",
    meta: "Guided builds",
  },
];

function PathCard({
  path,
  compact = false,
}: {
  path: AppPath;
  compact?: boolean;
}) {
  return (
    <Link to={path.href} className={compact ? styles.compactCard : styles.card}>
      <div className={styles.cardMeta}>
        <span>{path.eyebrow}</span>
        <span>{path.meta}</span>
      </div>
      <h3>{path.title}</h3>
      <p>{path.description}</p>
      <span className={styles.cardCta}>Open guide</span>
    </Link>
  );
}

export default function AppsIndex(): ReactNode {
  return (
    <div className={styles.appsIndex}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Build Applications</p>
        <h1>Build applications on Stellar</h1>
        <p>
          Choose the path that matches what you are building: a wallet, a
          payment app, a contract-backed dapp, or a data pipeline.
        </p>
      </section>

      <section className={styles.featured}>
        <PathCard path={appPaths[0]} />
        <PathCard path={appPaths[1]} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Build paths</h2>
          <span>{appPaths.length - 2} focused guides</span>
        </div>
        <div className={styles.grid}>
          {appPaths.slice(2).map((path) => (
            <PathCard key={path.href} path={path} />
          ))}
        </div>
      </section>

      <section className={styles.related}>
        <div>
          <p className={styles.eyebrow}>Related</p>
        </div>
        <div className={styles.relatedGrid}>
          {relatedPaths.map((path) => (
            <PathCard key={path.href} path={path} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
