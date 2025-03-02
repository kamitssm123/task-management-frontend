import Switch from "react-switch";
import React, { useCallback, useMemo } from "react";

import "./FormField.style.css";
import { formatDate } from "../../../utils/timeUtils";
import { FormFieldConfigType, FormFieldType } from "../../../hooks/useForm";

interface FormFieldProps {
  field: FormFieldConfigType;
  value: any;
  onFieldChange: (fieldId: string, value: any) => void;
}

const TextField: React.FC<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FormFieldProps
> = ({ field, value = "", onFieldChange, type = "text", ...restProps }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field.id, event.target.value);
    },
    [onFieldChange, field.id]
  );

  return (
    <input
      type={type}
      placeholder={field.properties?.placeholder ?? field.label}
      value={value}
      onChange={handleChange}
      className="field-text"
      {...restProps}
    />
  );
};

const NumberField: React.FC<FormFieldProps> = ({ field, value, onFieldChange }) => {
  return <TextField field={field} value={value} onFieldChange={onFieldChange} type="number" {...field.properties} />;
};

const DateTimeField: React.FC<FormFieldProps> = ({ field, value: valueFromProps, onFieldChange }) => {
  const value = useMemo(() => formatDate(valueFromProps), [valueFromProps]);

  const handleChange = useCallback(
    (fieldId: string, value: string) => {
      onFieldChange(fieldId, new Date(value).getTime());
    },
    [onFieldChange]
  );

  return (
    <TextField field={field} value={value} onFieldChange={handleChange} type="datetime-local" {...field.properties} />
  );
};

const ToggleField: React.FC<FormFieldProps> = ({ field, value, onFieldChange }) => {
  const handleChange = useCallback(
    (checked: boolean) => {
      const value = checked ? field.properties.on : field.properties.off;
      onFieldChange(field.id, value);
    },
    [onFieldChange, field.properties, field.id]
  );

  return (
    <div className="field-toggle-row">
      <div className="field-toggle-property">{field.properties.off}</div>
      <Switch
        checked={value === field.properties.on}
        onChange={handleChange}
        offColor="#a2adb8"
        onColor="#5b52dd"
        uncheckedIcon={false}
        checkedIcon={false}
      />
      <div className="field-toggle-property">{field.properties.on}</div>
    </div>
  );
};

const getComponent = (type: FormFieldType) => {
  switch (type) {
    case FormFieldType.TEXT:
      return TextField;
    case FormFieldType.NUMBER:
      return NumberField;
    case FormFieldType.DATE_TIME:
      return DateTimeField;
    case FormFieldType.TOGGLE:
      return ToggleField;
    default:
      return null;
  }
};

const FormField: React.FC<FormFieldProps> = ({ field, ...restProps }) => {
  const Component = useMemo(() => getComponent(field.type), [field.type]);

  if (!Component) {
    return null;
  }
  return (
    <div className="field-wrapper">
      <div className="field-label">{field.label}</div>
      <Component field={field} {...restProps} />
    </div>
  );
};

export default React.memo(FormField);
