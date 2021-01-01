import update from 'immutability-helper';
import { useCallback, useRef, useState } from 'react';

interface FieldMap {
  /**
   * Possible input values.
   * string: text fields
   * number: number type fields
   * boolean: checkbox
   */
  [name: string]: string | number | boolean;
}

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
export const useForm = () => {
  const initialFields = useRef<FieldMap>({});
  const [fields, setFields] = useState<FieldMap>({});

  /** Initial inputs can be empty while loading */
  const rehydrateFields = useCallback((initial: FieldMap) => {
    if (initial) {
      initialFields.current = initial;
      setFields(initial);
    }
  }, []);
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
  /** Handler for checkbox changes. */
  const handleCheckboxChange = (key: string) => (
    _event: unknown,
    checked: boolean,
  ) =>
    setFields(previousFields =>
      update(previousFields, {
        [key]: { $set: checked },
      }),
    );
  /** Restore initial input values */
  const resetForm = () => setFields(initialFields.current);
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
    rehydrateFields,
    handleFieldChange,
    handleCheckboxChange,
    resetForm,
    clearForm,
  } as const;
};
