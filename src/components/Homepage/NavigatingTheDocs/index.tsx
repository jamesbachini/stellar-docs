import React, { type ReactNode } from "react";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

export type NavigatingDocsItem = {
  title: string;
  description: ReactNode;
  image: string;
  cta: ReactNode;
  link: string;
};

export const exploreLabel = (label = "Explore") => (
  <Translate
    id={`component.Homepage.ExploreButton.${label.replace(/\s/g, "")}.Text`}
    description="The text that will be displayed on homepage card links"
  >
    {label}
  </Translate>
);

export const partitionBoxes = <T,>(boxesArray: T[]): T[][] => {
  return boxesArray.reduce<T[][]>((acc, item, i, arr) => {
    if (i % 2 === 0) {
      acc.push(arr.slice(i, i + 2));
    }
    return acc;
  }, []);
};

const NavigatingDocsBoxes: NavigatingDocsItem[] = [
  {
    title: translate({
      message: "Access Data and APIs",
      id: "component.Homepage.NavigatingTheDocs.AccessData.Title",
    }),
    image: "/img/homepage/access-data.png",
    description: (
      <Translate
        id="component.Homepage.NavigatingTheDocs.AccessData.Description"
        description="Description for the data and APIs homepage card."
      >
        Use RPC, Horizon, analytics, and indexer documentation to retrieve
        network data, submit transactions, and power applications.
      </Translate>
    ),
    cta: exploreLabel("Explore data"),
    link: "/docs/data",
  },
  {
    title: translate({
      message: "Build on Stellar",
      id: "component.Homepage.NavigatingTheDocs.Build.Title",
    }),
    image: "/img/homepage/build-stellar.png",
    description: (
      <Translate
        id="component.Homepage.NavigatingTheDocs.Build.Description"
        description="Description for the build homepage card."
      >
        Go from first prototype to production with smart contract tutorials,
        application guides, and task-focused implementation docs.
      </Translate>
    ),
    cta: exploreLabel("Start building"),
    link: "/docs/build",
  },
  {
    title: translate({
      message: "Operate and Integrate",
      id: "component.Homepage.NavigatingTheDocs.Operate.Title",
    }),
    image: "/img/homepage/operate-integrate.png",
    description: (
      <Translate
        id="component.Homepage.NavigatingTheDocs.Operate.Description"
        description="Description for the operate and integrate homepage card."
      >
        Find platform docs, developer tools, network references, and validator
        guidance for running Stellar in real-world environments.
      </Translate>
    ),
    cta: exploreLabel("View platforms"),
    link: "/docs/platforms",
  },
];

function NavigatingDocsFeature({
  title,
  description,
  image,
  cta,
  link,
}: NavigatingDocsItem) {
  return (
    <Link to={link} className={styles.NavigatingDocsFeature}>
      <img src={image} alt="" className={styles.cardImage} loading="lazy" />
      <div className={styles.cardBody}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <span className={styles.docLink}>{cta}</span>
      </div>
    </Link>
  );
}

export default function NavigatingTheDocs() {
  return (
    <section className={styles.docsGrid}>
      {NavigatingDocsBoxes.map((props) => (
        <NavigatingDocsFeature key={props.title} {...props} />
      ))}
    </section>
  );
}
