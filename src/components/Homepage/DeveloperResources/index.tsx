import React, { type ReactNode } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Card from "@site/src/components/ui/Card";
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
      message: "SDF Video Content",
      id: "component.Homepage.DeveloperResources.Tools.Title",
    }),
    icon: "video",
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

function DeveloperResourcesFeature({
  title,
  description,
  link,
  linkLabel,
  icon,
}: DeveloperResourcesItem) {
  return (
    <Card
      href={link}
      variant="resource"
      title={title}
      description={description}
      cta={linkLabel}
      icon={
        <span className={styles.icon} data-icon={icon} aria-hidden="true" />
      }
    />
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
