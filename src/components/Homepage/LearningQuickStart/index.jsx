import { useState } from "react";
import QuickStart from "../QuickStart";
import StellarLearningPaths from "../StellarLearningPaths";
import styles from "./styles.module.css";

export default function LearningQuickStart() {
  const [activeTrack, setActiveTrack] = useState("contract");

  return (
    <>
      <StellarLearningPaths
        activeTrack={activeTrack}
        onTrackChange={setActiveTrack}
      />

      <section className={styles.quickStartSection}>
        <h2 id="quick-start">
          Quick Start
          <a
            className="hash-link"
            href="#quick-start"
            title="Direct link to Quick Start"
          />
        </h2>
        <p>
          Get a working Stellar development flow in place, fund a test account,
          and choose the track that fits your product.
        </p>
        <QuickStart activeTrack={activeTrack} />
      </section>
    </>
  );
}
