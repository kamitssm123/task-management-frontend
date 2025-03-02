import React, { useCallback } from "react";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

import "./Checkbox.style.css";

const CheckedBox = MdCheckBox as any;
const UncheckedBox = MdCheckBoxOutlineBlank as any;

interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  onColor?: string;
  offColor?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  onColor = "rgb(92, 82, 221)",
  offColor = "rgb(92, 82, 221)",
}) => {
  const handleClick = useCallback(() => {
    onToggle(!checked);
  }, [onToggle, checked]);

  return (
    <button type="button" onClick={handleClick} className="checkbox-button">
      {checked ? <CheckedBox size={18} color={onColor} /> : <UncheckedBox size={18} color={offColor} />}
    </button>
  );
};

export default React.memo(Checkbox);
