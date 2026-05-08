import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

type DeveloperResourcesItem = {
  title: string;
  description: ReactNode;
  linkLabel: ReactNode;
  link: string;
  icon: string;
  host: string;
};

const DeveloperResourcesBoxes: DeveloperResourcesItem[] = [
  {
    title: translate({
      message: "Discord Community",
      id: "component.Homepage.DeveloperResources.Discord.Title",
    }),
    icon: "message",
    host: "discord.gg",
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
    host: "stellar.org",
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
      message: "SDF Video Content",
      id: "component.Homepage.DeveloperResources.Tools.Title",
    }),
    icon: "video",
    host: "youtube.com",
    description: (
      <Translate
        id="component.Homepage.DeveloperResources.Tools.Description"
        description="Description for the SDF video content resource card."
      >
        Watch the latest interviews, tutorials, and live streams from the
        Stellar Development Foundation.
      </Translate>
    ),
    linkLabel: (
      <Translate id="component.Homepage.DeveloperResources.Tools.Link">
        Watch videos
      </Translate>
    ),
    link: "https://www.youtube.com/@StellarDevelopmentFoundation",
  },
];

function ResourceTile({
  title,
  description,
  link,
  linkLabel,
  icon,
  host,
}: DeveloperResourcesItem) {
  return (
    <Link to={link} className={styles.resourceTile}>
      <span
        className={styles.resourceIcon}
        data-icon={icon}
        aria-hidden="true"
      />
      <div className={styles.resourceBody}>
        <div className={styles.resourceHeader}>
          <Heading as="h3" className={styles.resourceTitle}>
            {title}
          </Heading>
          <span className={styles.resourceHost} aria-hidden="true">
            {host}
          </span>
        </div>
        <p className={styles.resourceDescription}>{description}</p>
        <span className={styles.resourceCta}>{linkLabel}</span>
      </div>
    </Link>
  );
}

export default function DeveloperResources() {
  return (
    <section className={styles.resourcesGrid}>
      {DeveloperResourcesBoxes.map((props) => (
        <ResourceTile key={props.title} {...props} />
      ))}
    </section>
  );
}
