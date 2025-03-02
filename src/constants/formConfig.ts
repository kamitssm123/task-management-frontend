import { FormConfig, FormFieldType } from "../hooks/useForm";

const FORM_FIELDS = {
  TITLE: "title",
  PRIORITY: "priority",
  STATUS: "status",
  START_TIME: "start_time",
  END_TIME: "end_time",
} as const;

const FORM_CONFIG: FormConfig = {
  [FORM_FIELDS.TITLE]: {
    id: FORM_FIELDS.TITLE,
    type: FormFieldType.TEXT,
    label: "Title",
    row: 0,
    properties: {
      placeholder: "Add Title",
    },
  },
  [FORM_FIELDS.PRIORITY]: {
    id: FORM_FIELDS.PRIORITY,
    type: FormFieldType.NUMBER,
    label: "Priority",
    row: 1,
    properties: {
      min: 1,
    },
  },
  [FORM_FIELDS.STATUS]: {
    id: FORM_FIELDS.STATUS,
    type: FormFieldType.TOGGLE,
    label: "Status",
    row: 1,
    properties: {
      off: "Pending",
      on: "Completed",
    },
  },
  [FORM_FIELDS.START_TIME]: {
    id: FORM_FIELDS.START_TIME,
    type: FormFieldType.DATE_TIME,
    label: "Start time",
    row: 2,
  },
  [FORM_FIELDS.END_TIME]: {
    id: FORM_FIELDS.END_TIME,
    type: FormFieldType.DATE_TIME,
    label: "End time",
    row: 2,
  },
};

export default FORM_CONFIG;

export const getInitialFormData = (overrides = {}) => ({
  [FORM_FIELDS.TITLE]: "",
  [FORM_FIELDS.PRIORITY]: 1,
  [FORM_FIELDS.STATUS]: FORM_CONFIG[FORM_FIELDS.STATUS].properties.off,
  [FORM_FIELDS.START_TIME]: Date.now(),
  [FORM_FIELDS.END_TIME]: Date.now(),
  ...overrides,
});
