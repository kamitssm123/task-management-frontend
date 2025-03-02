import React, { useCallback, useMemo } from "react";

import "./PrimaryButton.style.css";

interface PrimaryButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  primaryColor?: string;
  invertColors?: boolean;
  IconComponent?: any;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  primaryColor,
  invertColors = false,
  IconComponent,
  disabled = false,
}) => {
  const contentColor = invertColors ? primaryColor : "#fff";

  const style = useMemo(
    () =>
      primaryColor
        ? {
            backgroundColor: invertColors ? "#fff" : primaryColor,
            color: contentColor,
            border: `1px solid ${primaryColor}`,
          }
        : {},
    [invertColors, primaryColor, contentColor]
  );

  const renderIcon = useCallback(() => {
    if (!IconComponent) {
      return null;
    }
    return <IconComponent size={12} color={contentColor} />;
  }, [IconComponent, contentColor]);

  return (
    <button
      type="button"
      className={`base-button ${invertColors ? "button-inverted" : "button"} ${disabled ? "button-disabled" : ""}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="button-content">
        {renderIcon()}
        {label}
      </div>
    </button>
  );
};

export default React.memo(PrimaryButton);
