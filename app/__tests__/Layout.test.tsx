import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts';
import { CURRENT_USER_QUERY } from '~app/graphql';
import { fakeUser } from '~app/utils';

const anonymousMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const authUserMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser({ colorMode: 'DARK' }) } },
  },
];

describe('<Layout />', () => {
  it('renders properly for anonymous users.', async () => {
    const { container } = render(
      <MockedProvider mocks={anonymousMocks}>
        <UserProvider>
          <Layout>...</Layout>
        </UserProvider>
      </MockedProvider>,
    );
    waitFor(() => expect(container).toMatchSnapshot());
  });

  it('renders properly for anonymous users.', async () => {
    const { container } = render(
      <MockedProvider mocks={authUserMocks}>
        <UserProvider>
          <Layout>...</Layout>
        </UserProvider>
      </MockedProvider>,
    );
    waitFor(() => expect(container).toMatchSnapshot());
  });
});
