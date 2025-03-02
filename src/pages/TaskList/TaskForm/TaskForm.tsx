import React, { useCallback } from "react";
import _noop from "lodash";
import Modal from "react-modal";

import "./TaskForm.style.css";
import useForm, { FormConfig, SubmitHandler } from "../../../hooks/useForm";
import PrimaryButton from "../../../components/PrimaryButton";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 1000, // Ensure it's above other content
  },
  content: {
    width: "40%",
    height: "fit-content",
    margin: "auto",
    padding: "36px",
    borderRadius: "4px",
    border: "none",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
};

interface TaskFormProps {
  title: string;
  description?: string;
  formConfig: FormConfig;
  initialFormData?: Record<string, any>;
  submitLabel: string;
  cancelLabel?: string;
  onSubmit?: SubmitHandler;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  description,
  formConfig,
  initialFormData = {},
  submitLabel,
  cancelLabel = "Cancel",
  onSubmit: onSubmitFromProps = _noop,
  isOpen,
  setIsOpen,
}) => {
  const { onSubmit, renderFormFields } = useForm({ formConfig, submitHandler: onSubmitFromProps, initialFormData });

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={close} contentLabel="Form Modal" style={customStyles}>
      <h2 className={`primary-header ${!!description ? "form-header" : ""}`}>{title}</h2>
      {!!description && <div className="form-description">{description}</div>}
      {renderFormFields()}
      <div className="cta-row">
        <PrimaryButton label={submitLabel} onClick={onSubmit} />
        <PrimaryButton label={cancelLabel} onClick={close} invertColors primaryColor="rgb(144, 157, 169)" />
      </div>
    </Modal>
  );
};

export default TaskForm;
