import React from "react";

import "./SummarySection.style.css";
import { SummaryConfigItem } from "./types";

interface SummarySectionProps {
  heading: string;
  config?: SummaryConfigItem[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ heading, config = [] }) => {
  return (
    <div>
      <div className="summary-heading">{heading}</div>
      {config.length > 0 && (
        <div className="summary-row">
          {config.map(({ label, value, description }) => (
            <div className="summary-item" key={label + value}>
              <div className="item-value">{value}</div>
              <div className="item-label">{label}</div>
              {!!description && <div className="item-label item-description">{description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SummarySection);
