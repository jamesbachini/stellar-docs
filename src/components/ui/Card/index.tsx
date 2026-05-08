import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./Card.module.css";

type CardVariant = "default" | "feature" | "resource";

type CardProps = {
  href: string;
  title: ReactNode;
  description: ReactNode;
  cta?: ReactNode;
  icon?: ReactNode;
  variant?: CardVariant;
  className?: string;
};

export default function Card({
  href,
  title,
  description,
  cta,
  icon,
  variant = "default",
  className,
}: CardProps): ReactNode {
  return (
    <Link to={href} className={clsx(styles.card, styles[variant], className)}>
      {icon ? <div className={styles.iconSlot}>{icon}</div> : null}
      <div className={styles.body}>
        <Heading as="h3" className={styles.title}>
          {title}
        </Heading>
        <p className={styles.description}>{description}</p>
        {cta ? <span className={styles.cta}>{cta}</span> : null}
      </div>
    </Link>
  );
}
