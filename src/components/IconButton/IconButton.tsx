import React, { useCallback } from "react";

import "./IconButton.style.css";

interface IconButtonProps {
  IconComponent: any;
  size?: number;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton: React.FC<IconButtonProps> = ({ IconComponent, size = 18, color = "#000", onClick }) => {
  const renderIcon = useCallback(() => {
    return <IconComponent size={size} color={color} />;
  }, [IconComponent, size, color]);

  return (
    <button type="button" className="icon-button" onClick={onClick}>
      {renderIcon()}
    </button>
  );
};

export default React.memo(IconButton);
