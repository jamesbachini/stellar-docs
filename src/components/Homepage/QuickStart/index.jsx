import styles from "./styles.module.css";

const quickStartLinks = {
  contract: [
    {
      label: "Getting Started Guide",
      description:
        "A complete guide to getting set up for smart contract development.",
      href: "/docs/build/smart-contracts/getting-started",
    },
    {
      label: "Hello World",
      description:
        "Experiment with a basic Hello World contract in the SoroPG online IDE.",
      href: "https://soropg.com/?codeUrl=https%3A%2F%2Fgithub.com%2Fstellar%2Fsoroban-examples%2Ftree%2Fmain%2Fhello_world",
    },
  ],
  frontend: [
    {
      label: "Frontend Builders Guide",
      description:
        "Learn how to build app frontends that connect to Stellar accounts, contracts, and network data.",
      href: "/docs/build/apps",
    },
    {
      label: "JS Stellar SDK",
      description:
        "Use the JavaScript SDK to create transactions, query Stellar data, and integrate Stellar from web apps.",
      href: "https://stellar.github.io/js-stellar-sdk/",
    },
  ],
  entrepreneurs: [
    {
      label: "The Stellar Stack",
      description:
        "Understand the core Stellar services, APIs, and tools that support products built on the network.",
      href: "/docs/learn/fundamentals/stellar-stack",
    },
    {
      label: "Grants & Funding",
      description:
        "Explore funding programs available for teams building in the Stellar ecosystem.",
      href: "https://stellar.org/grants-and-funding",
    },
  ],
  enterprise: [
    {
      label: "Enterprise Use Cases",
      description:
        "See how institutions use Stellar for payments, tokenization, treasury, and on/off-ramp workflows.",
      href: "https://stellar.org/use-cases",
    },
    {
      label: "Enterprise Fund",
      description:
        "Learn about strategic investment support for companies building on Stellar.",
      href: "https://stellar.org/enterprise-fund",
    },
  ],
};

function QuickStartCard({ description, href, index, label }) {
  const isExternal = href.startsWith("http");

  return (
    <a
      className={styles.card}
      href={href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      <span className={styles.index}>{index}</span>
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </a>
  );
}

export default function QuickStart({ activeTrack = "contract" }) {
  const links = quickStartLinks[activeTrack] ?? quickStartLinks.contract;

  return (
    <section className={styles.quickStart}>
      <div className={styles.links}>
        {links.map((link, index) => (
          <QuickStartCard
            key={link.href}
            description={link.description}
            href={link.href}
            index={index + 1}
            label={link.label}
          />
        ))}
      </div>
    </section>
  );
}
