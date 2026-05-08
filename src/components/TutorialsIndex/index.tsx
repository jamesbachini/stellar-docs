import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type Tutorial = {
  title: string;
  href: string;
  description: string;
  category: string;
  level: string;
  focus: string;
};

const tutorials: Tutorial[] = [
  {
    title: "Getting Started with Smart Contracts",
    href: "/docs/build/smart-contracts/getting-started/",
    description:
      "Set up your environment, write a Rust contract, test it, and deploy to Testnet.",
    category: "Smart contracts",
    level: "Beginner",
    focus: "Rust + CLI",
  },
  {
    title: "Develop a Contract with Frontend Templates",
    href: "/docs/build/apps/dapp-frontend",
    description:
      "Start from a Stellar dapp template and connect a frontend to contract interactions.",
    category: "Smart contracts",
    level: "Intermediate",
    focus: "Frontend",
  },
  {
    title: "Wallet SDK",
    href: "/docs/build/apps/wallet/overview",
    description:
      "Build wallet flows with account management, transactions, and Stellar network access.",
    category: "Applications",
    level: "Beginner",
    focus: "Wallets",
  },
  {
    title: "Build a Payment App with the JS SDK",
    href: "/docs/build/apps/example-application-tutorial/",
    description:
      "Create a payment application while learning accounts, assets, operations, and signing.",
    category: "Applications",
    level: "Beginner",
    focus: "JavaScript",
  },
  {
    title: "Build a Payment App with Swift",
    href: "/docs/build/apps/swift-payment-app",
    description:
      "Use Swift to build a mobile payment experience backed by Stellar payments.",
    category: "Applications",
    level: "Intermediate",
    focus: "Swift",
  },
  {
    title: "Build a Passkey Powered Guestbook dApp",
    href: "/docs/build/apps/guestbook/",
    description:
      "Create a dapp that uses passkeys and smart contracts for a modern signing flow.",
    category: "dApps",
    level: "Intermediate",
    focus: "Passkeys",
  },
  {
    title: "Build a Paid x402 API",
    href: "/docs/build/agentic-payments/x402/quickstart-guide",
    description:
      "Add machine-payable access to an API with x402 and Stellar payment rails.",
    category: "Agentic payments",
    level: "Intermediate",
    focus: "x402",
  },
  {
    title: "Build a Paid MPP API",
    href: "/docs/build/agentic-payments/mpp/charge-guide",
    description:
      "Charge for API usage with MPP payments and a server-side integration.",
    category: "Agentic payments",
    level: "Intermediate",
    focus: "MPP",
  },
  {
    title: "Build a Custom Network Ingestion Pipeline",
    href: "/docs/build/apps/ingest-sdk/",
    description:
      "Stream and process Stellar network data with a custom ingestion pipeline.",
    category: "Data ingestion",
    level: "Advanced",
    focus: "Data",
  },
];

const categories = Array.from(
  new Set(tutorials.map((tutorial) => tutorial.category)),
);

function TutorialCard({ tutorial }: { tutorial: Tutorial }): ReactNode {
  return (
    <Link to={tutorial.href} className={styles.card}>
      <div className={styles.cardTopline}>
        <span>{tutorial.category}</span>
        <span>{tutorial.level}</span>
      </div>
      <h3 className={styles.cardTitle}>{tutorial.title}</h3>
      <p className={styles.cardDescription}>{tutorial.description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.focus}>{tutorial.focus}</span>
        <span className={styles.cta}>Start tutorial</span>
      </div>
    </Link>
  );
}

export default function TutorialsIndex(): ReactNode {
  return (
    <div className={styles.tutorialsIndex}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Learning paths</p>
          <p className={styles.intro}>
            Guided, end-to-end projects for building smart contracts,
            applications, dapps, paid APIs, and data pipelines on Stellar.
          </p>
        </div>
        <div className={styles.heroPanel} aria-label="Tutorial summary">
          <span>{tutorials.length}</span>
          <p>hands-on tutorials across the main Stellar build workflows</p>
        </div>
      </section>

      <nav className={styles.categoryNav} aria-label="Tutorial categories">
        {categories.map((category) => (
          <a
            key={category}
            href={`#${category.toLowerCase().replaceAll(" ", "-")}`}
          >
            {category}
          </a>
        ))}
      </nav>

      {categories.map((category) => {
        const categoryTutorials = tutorials.filter(
          (tutorial) => tutorial.category === category,
        );

        return (
          <section
            key={category}
            id={category.toLowerCase().replaceAll(" ", "-")}
            className={styles.categorySection}
          >
            <div className={styles.sectionHeader}>
              <h2>{category}</h2>
              <span>
                {categoryTutorials.length}{" "}
                {categoryTutorials.length === 1 ? "tutorial" : "tutorials"}
              </span>
            </div>
            <div className={styles.grid}>
              {categoryTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.href} tutorial={tutorial} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
