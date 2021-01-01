import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useUser } from '~/hooks';

const Test: React.FC = () => {
  const me = useUser();
  const { values, handleChange } = useFormik({
    initialValues: {
      email: me?.email,
      name: me?.name,
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(() => {
    console.log(me);
  }, [me]);

  return (
    <form action="post">
      <input type="email" value={values.email} onChange={handleChange} />
      <input type="text" value={values.name} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
