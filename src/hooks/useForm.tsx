import _map from "lodash/map";
import _values from "lodash/values";
import _groupBy from "lodash/groupBy";
import { useCallback, useMemo, useState } from "react";

import FormField from "../components/Form/FormField";

export enum FormFieldType {
  TEXT,
  NUMBER,
  TOGGLE,
  DATE_TIME,
}

export interface FormFieldConfigType {
  type: FormFieldType;
  id: string;
  label: string;
  properties?: any;
  row: number;
  optional?: boolean; // <-- Added this line to support optional fields
}

export type FormConfig = Record<string, FormFieldConfigType>;

export type SubmitHandler = (formState: Record<string, any>) => void;

const adaptFormConfig = (config: FormConfig) => _values(_groupBy(_values(config), "row"));

interface UseFormArgs {
  formConfig: FormConfig;
  submitHandler: SubmitHandler;
  initialFormData?: Record<string, any>;
}

const useForm = ({ formConfig, submitHandler, initialFormData = {} }: UseFormArgs) => {
  const [formState, setFormState] = useState<Record<string, any>>(initialFormData);

  const onFieldChange = useCallback((fieldId: string, value: any) => {
    setFormState((prevFormState) => ({ ...prevFormState, [fieldId]: value }));
  }, []);

  const onSubmit = useCallback(() => {
    submitHandler(formState);
  }, [formState, submitHandler]);

  const adaptedFormConfig = useMemo(() => adaptFormConfig(formConfig), [formConfig]);

  const renderFormFields = useCallback(() => {
    return (
      <div className="form-fields-container">
        {_map(adaptedFormConfig, (row, index) => {
          return (
            <div key={`${index}`} className="form-fields-row">
              {_map(row, (field) => {
                return (
                  <div key={field.id} className="form-field-item">
                    {
                      <FormField
                        key={field.id}
                        field={field}
                        value={formState[field.id]}
                        onFieldChange={onFieldChange}
                      />
                    }
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }, [adaptedFormConfig, formState, onFieldChange]);

  return { onSubmit, renderFormFields };
};

export default useForm;
