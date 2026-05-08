import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

type WayfindingItem = {
  title: string;
  description: ReactNode;
  linkLabel: ReactNode;
  link: string;
  icon: string;
};

const WayfindingWays: WayfindingItem[] = [
  {
    title: translate({
      message: "Ship a Smart Contract",
      id: "components.WayfindingBoxes.SmartContractDevelopers.Title",
    }),
    icon: "cube",
    description: (
      <Translate
        id="components.WayfindingBoxes.SmartContractDevelopers.Description"
        description="Short description for a popular path card on the homepage."
      >
        Install the toolchain, compile Wasm, deploy to Testnet, and learn the
        contract model from the ground up.
      </Translate>
    ),
    linkLabel: (
      <Translate id="components.WayfindingBoxes.SmartContractDevelopers.Link">
        Start contracts
      </Translate>
    ),
    link: "/docs/build/smart-contracts/getting-started",
  },
  {
    title: translate({
      message: "Build an App or Wallet",
      id: "components.WayfindingBoxes.Applications.Title",
    }),
    icon: "mobile",
    description: (
      <Translate
        id="components.WayfindingBoxes.Applications.Description"
        description="Short description for a popular path card on the homepage."
      >
        Explore frontend, wallet, passkey, and example-app documentation to
        assemble a complete user experience.
      </Translate>
    ),
    linkLabel: (
      <Translate id="components.WayfindingBoxes.Applications.Link">
        Start apps
      </Translate>
    ),
    link: "/docs/build/apps/overview",
  },
  {
    title: translate({
      message: "Integrate Real-Time Data",
      id: "components.WayfindingBoxes.Data.Title",
    }),
    icon: "bolt",
    description: (
      <Translate
        id="components.WayfindingBoxes.Data.Description"
        description="Short description for a popular path card on the homepage."
      >
        Use Stellar RPC for transaction submission, simulation, event retrieval,
        and contract-related app workflows.
      </Translate>
    ),
    linkLabel: (
      <Translate id="components.WayfindingBoxes.Data.Link">Use RPC</Translate>
    ),
    link: "/docs/data/apis/rpc",
  },
  {
    title: translate({
      message: "How To Guides",
      id: "components.WayfindingBoxes.HowToGuides.Title",
    }),
    icon: "wallet",
    description: (
      <Translate
        id="components.WayfindingBoxes.HowToGuides.Description"
        description="Short description for a popular path card on the homepage."
      >
        Step-by-step instructions to help users complete specific tasks.
      </Translate>
    ),
    linkLabel: (
      <Translate id="components.WayfindingBoxes.HowToGuides.Link">
        View guides
      </Translate>
    ),
    link: "/docs/build/guides",
  },
];

function PathCard({
  title,
  description,
  link,
  linkLabel,
  icon,
  index,
}: WayfindingItem & { index: number }) {
  const stepNumber = String(index + 1).padStart(2, "0");
  return (
    <Link to={link} className={styles.pathCard}>
      <span className={styles.pathAccent} aria-hidden="true" />
      <div className={styles.pathHeader}>
        <span className={styles.pathStep} aria-hidden="true">
          Path {stepNumber}
        </span>
        <span
          className={styles.pathIcon}
          data-icon={icon}
          aria-hidden="true"
        />
      </div>
      <div className={styles.pathBody}>
        <Heading as="h3" className={styles.pathTitle}>
          {title}
        </Heading>
        <p className={styles.pathDescription}>{description}</p>
        <span className={styles.pathCta}>{linkLabel}</span>
      </div>
    </Link>
  );
}

export default function WayfindingBoxes() {
  return (
    <section className={styles.pathGrid}>
      {WayfindingWays.map((props, index) => (
        <PathCard key={props.title} index={index} {...props} />
      ))}
    </section>
  );
}
