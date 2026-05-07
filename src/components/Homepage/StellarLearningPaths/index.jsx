import { useState } from "react";
import FlowChart from "./FlowChart";
import styles from "./styles.module.css";

export const tracks = [
  {
    id: "contract",
    label: "Contract Developers",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 8l-4 4 4 4M17 8l4 4-4 4M10 19l4-14"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "frontend",
    label: "Frontend Developers",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          fill="none"
          height="14"
          rx="2"
          ry="2"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          x="3"
          y="4"
        />
        <path
          d="M8 20h8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "entrepreneurs",
    label: "Founders & Investors",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2l4 8-4 4-4-4 4-8z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M8 14l-2 8h12l-2-8"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "enterprise",
    label: "Enterprise & Institutions",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 10l9-6 9 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M5 10v8M9 10v8M15 10v8M19 10v8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M3 18h18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export function LearningPathTabs({
  activeTrack,
  ariaLabel = "Choose a learning path",
  onTrackChange,
}) {
  return (
    <div className={styles.trackButtons} role="tablist" aria-label={ariaLabel}>
      {tracks.map((track) => (
        <button
          key={track.id}
          type="button"
          role="tab"
          aria-selected={activeTrack === track.id}
          className={`${styles.trackButton} ${
            activeTrack === track.id ? styles.active : ""
          }`}
          onClick={() => onTrackChange(track.id)}
        >
          <span className={styles.icon}>{track.icon}</span>
          <span className={styles.label}>{track.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function StellarLearningPaths({
  activeTrack: controlledActiveTrack,
  initialTrack = "contract",
  onTrackChange,
}) {
  const [uncontrolledActiveTrack, setUncontrolledActiveTrack] =
    useState(initialTrack);
  const activeTrack = controlledActiveTrack ?? uncontrolledActiveTrack;
  const handleTrackChange = onTrackChange ?? setUncontrolledActiveTrack;

  return (
    <section
      className={styles.learningPaths}
      aria-label="Interactive learning paths"
    >
      <div className={styles.learningPathsGrid}>
        <div className={styles.trackPanel}>
          <LearningPathTabs
            activeTrack={activeTrack}
            onTrackChange={handleTrackChange}
          />
        </div>

        <FlowChart track={activeTrack} />
      </div>
    </section>
  );
}
