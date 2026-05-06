import React, { type ReactNode } from "react";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

type DeveloperResourcesItem = {
  title: string;
  description: ReactNode;
  linkLabel: ReactNode;
  link: string;
  icon: string;
};

const DeveloperResourcesBoxes: DeveloperResourcesItem[] = [
  {
    title: translate({
      message: "Discord Community",
      id: "component.Homepage.DeveloperResources.Discord.Title",
    }),
    icon: "message",
    description: (
      <Translate
        id="component.Homepage.DeveloperResources.Discord.Description"
        description="Description for the Discord resource card."
      >
        Ask implementation questions, follow ecosystem conversations, and
        connect with other Stellar builders.
      </Translate>
    ),
    linkLabel: (
      <Translate id="component.Homepage.DeveloperResources.Discord.Link">
        Join Discord
      </Translate>
    ),
    link: "https://discord.gg/stellardev",
  },
  {
    title: translate({
      message: "Stellar Blog",
      id: "component.Homepage.DeveloperResources.Blog.Title",
    }),
    icon: "newspaper",
    description: (
      <Translate
        id="component.Homepage.DeveloperResources.Blog.Description"
        description="Description for the Stellar Blog resource card."
      >
        Keep up with release notes, ecosystem announcements, and platform
        updates from the Stellar team.
      </Translate>
    ),
    linkLabel: (
      <Translate id="component.Homepage.DeveloperResources.Blog.Link">
        Read updates
      </Translate>
    ),
    link: "https://stellar.org/blog",
  },
  {
    title: translate({
      message: "Developer Tools",
      id: "component.Homepage.DeveloperResources.Tools.Title",
    }),
    icon: "toolbox",
    description: (
      <Translate
        id="component.Homepage.DeveloperResources.Tools.Description"
        description="Description for the developer tools resource card."
      >
        Discover IDEs, explorers, analytics services, wallets, and other tools
        used across the ecosystem.
      </Translate>
    ),
    linkLabel: (
      <Translate id="component.Homepage.DeveloperResources.Tools.Link">
        Browse tools
      </Translate>
    ),
    link: "/docs/tools/developer-tools",
  },
];

function DeveloperResourcesFeature({
  title,
  description,
  link,
  linkLabel,
  icon,
}: DeveloperResourcesItem) {
  return (
    <Link to={link} className={styles.DeveloperResourcesFeature}>
      <span className={styles.icon} data-icon={icon} aria-hidden="true" />
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
      <span className={styles.resourceLink}>{linkLabel}</span>
    </Link>
  );
}

export default function DeveloperResources() {
  return (
    <section className={styles.resourcesGrid}>
      {DeveloperResourcesBoxes.map((props) => (
        <DeveloperResourcesFeature key={props.title} {...props} />
      ))}
    </section>
  );
}
