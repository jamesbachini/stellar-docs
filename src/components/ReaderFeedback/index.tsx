import React, { useState, type ReactNode } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";

import IconThumbsUp from "@site/static/icons/thumbs-up.svg";
import IconThumbsDown from "@site/static/icons/thumbs-down.svg";
import Translate, { translate } from "@docusaurus/Translate";

export default function ReaderFeedback(): ReactNode {
  const [feedbackGiven, setFeedbackGiven] = useState<"up" | "down" | null>(
    null,
  );

  const isBrowser = useIsBrowser();
  if (!isBrowser) {
    return null;
  }

  const giveFeedback = (value: "up" | "down") => {
    setFeedbackGiven(value);
  };

  return (
    <div className="readerFeedback">
      <span>
        <Translate
          id="components.ReaderFeedback.Prompt"
          description="A prompt to invite the reader to click a thumbsup/thumbsdown button"
        >
          Was this page helpful?
        </Translate>
      </span>
      <button
        type="button"
        className={`feedback_button ${
          feedbackGiven === "up" ? "feedback_selected" : ""
        }`}
        aria-pressed={feedbackGiven === "up"}
        onClick={() => giveFeedback("up")}
      >
        <IconThumbsUp
          className="feedback_thumbsup"
          title={translate({
            message: "Like",
            id: "components.ReaderFeedback.ThumbsUp.Title",
            description: "The title value for the thumbsup icon",
          })}
        />
      </button>
      <button
        type="button"
        className={`feedback_button ${
          feedbackGiven === "down" ? "feedback_selected" : ""
        }`}
        aria-pressed={feedbackGiven === "down"}
        onClick={() => giveFeedback("down")}
      >
        <IconThumbsDown
          className="feedback_thumbsdown"
          title={translate({
            message: "Dislike",
            id: "components.ReaderFeedback.ThumbsDown.Title",
            description: "The title value for the thumbsdown icon",
          })}
        />
      </button>
    </div>
  );
}
