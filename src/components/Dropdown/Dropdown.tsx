import { FaCheck } from "react-icons/fa";
import React, { useCallback, useMemo } from "react";

import "./Dropdown.style.css";

const CheckIcon = FaCheck as any;

interface DropdownProps {
  label: string;
  LeftIcon?: any;
  RightIcon?: any;
  options: string[];
  selectedValue?: string;
  onSelect: (option: string) => void;
  onRemove: () => void;
  removeLabel?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  LeftIcon,
  RightIcon,
  options,
  selectedValue,
  onSelect,
  onRemove,
  removeLabel = "Remove filter",
}) => {
  const completeLabel = useMemo(() => {
    if (!selectedValue) {
      return label;
    }
    return `${label}: ${selectedValue}`;
  }, [label, selectedValue]);

  const renderLeftIcon = useCallback(() => {
    if (!LeftIcon) {
      return null;
    }
    return <LeftIcon />;
  }, [LeftIcon]);

  const renderRightIcon = useCallback(() => {
    if (!RightIcon) {
      return null;
    }
    return <RightIcon />;
  }, [RightIcon]);

  return (
    <div className="dropdown">
      <div className={`dropbtn ${!!selectedValue ? "dropbtn-selected" : ""}`}>
        <div className="label-row">
          {renderLeftIcon()}
          {completeLabel}
          {renderRightIcon()}
        </div>
      </div>
      <div className="dropdown-content">
        {options.map((option) => (
          <button key={option} className="option-btn" onClick={() => onSelect(option)}>
            <div className={`option-row ${selectedValue === option ? "option-row-selected" : ""}`}>
              {option}
              {selectedValue === option && <CheckIcon />}
            </div>
          </button>
        ))}
        <button className="option-btn remove-option" onClick={onRemove}>
          {removeLabel}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
