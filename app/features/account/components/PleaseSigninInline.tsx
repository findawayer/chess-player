import React, { useState } from 'react';

import PleaseSignin from './PleaseSignin';
import Signin from './Signin';
import Signup from './Signup';

const PleaseSigninInline: React.FC = () => {
  const [route, setRoute] = useState<'signin' | 'signup' | null>(null);
  const signinHandler = () => setRoute('signin');
  const signupHandler = () => setRoute('signup');

  if (route === 'signin') {
    return <Signin noRedirect />;
  }
  if (route === 'signup') {
    return <Signup noRedirect />;
  }
  return (
    <PleaseSignin signinHandler={signinHandler} signupHandler={signupHandler} />
  );
};

export default PleaseSigninInline;
