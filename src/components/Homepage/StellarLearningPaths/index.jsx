import { useEffect, useRef, useState } from "react";
import FlowChart from "./FlowChart";
import styles from "./styles.module.css";

export const tracks = [
  {
    id: "contract",
    label: "Contract Developers",
  },
  {
    id: "frontend",
    label: "Frontend Developers",
  },
  {
    id: "entrepreneurs",
    label: "Founders & Investors",
  },
  {
    id: "enterprise",
    label: "Enterprise & Institutions",
  },
];

export function LearningPathTabs({
  activeTrack,
  ariaLabel = "Choose a learning path",
  onTrackChange,
}) {
  return (
    <div className={styles.trackScroll}>
      <div
        className={styles.trackButtons}
        role="tablist"
        aria-label={ariaLabel}
      >
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
            <span className={styles.label}>{track.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LazyFlowChart({ track }) {
  const [shouldRender, setShouldRender] = useState(false);
  const mountRef = useRef(null);

  useEffect(() => {
    if (shouldRender || typeof window === "undefined") return undefined;

    const mountElement = mountRef.current;
    let animationFrameId;
    let observer;

    const renderAfterPaint = () => {
      animationFrameId = window.requestAnimationFrame(() => {
        setShouldRender(true);
      });
    };

    if (!mountElement || !("IntersectionObserver" in window)) {
      renderAfterPaint();
      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    }

    observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        renderAfterPaint();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(mountElement);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldRender]);

  return (
    <div ref={mountRef} className={styles.flowLazyMount}>
      {shouldRender ? (
        <FlowChart track={track} />
      ) : (
        <section
          className={`${styles["flow-wrapper"]} ${styles.flowPlaceholder}`}
          aria-hidden="true"
        />
      )}
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

        <LazyFlowChart track={activeTrack} />
      </div>
    </section>
  );
}
