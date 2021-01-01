import update from 'immutability-helper';
import { useEffect, useState } from 'react';

/**
 * Possible input values.
 * string: text fields
 * number: number fields
 * boolean: checkbox
 * unknown: radio, select
 */

/** Get the input value based on its `type` attribute. */
const getFieldValue = (target: HTMLInputElement): number | string => {
  switch (target.type) {
    case 'number':
      return target.valueAsNumber;

    case 'file':
      return target.files[0].toString();

    default:
      return target.value;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useForm = (initialFields?: Record<string, unknown>) => {
  const [fields, setFields] = useState(initialFields);

  useEffect(() => {
    console.log('Rerunning');
    setFields(initialFields);
  }, [initialFields]);

  /** Handler for input field changes. */
  const handleFieldChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target }: { target: HTMLInputElement } = event;
    const value = getFieldValue(target);

    setFields(previousFields =>
      update(previousFields, {
        [key]: { $set: value },
      }),
    );
  };
  /** Handler for checkbox or select box changes. */
  const handleSelectionChange = (key: string) => (
    _event: unknown,
    value: unknown,
  ) =>
    setFields(previousFields =>
      update(previousFields, {
        [key]: { $set: value },
      }),
    );
  /** Restore initial input values */
  const resetForm = () => setFields(initialFields);
  /** Empty input values. */
  const clearForm = () => {
    setFields(previousFields =>
      update(previousFields, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        $apply: (_: never) => '',
      }),
    );
  };

  return {
    fields,
    handleFieldChange,
    handleSelectionChange,
    resetForm,
    clearForm,
  } as const;
};
