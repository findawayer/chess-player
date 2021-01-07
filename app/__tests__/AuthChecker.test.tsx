import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

import { UserProvider } from '~app/contexts';
import AuthChecker from '~app/features/account/containers/AuthChecker';
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
    result: { data: { me: fakeUser() } },
  },
];

describe('<AuthChecker />', () => {
  it('renders a please sign in dialog to anonymous users.', () => {
    const { getByText } = render(
      <MockedProvider mocks={anonymousMocks}>
        <UserProvider>
          <AuthChecker>💩</AuthChecker>
        </UserProvider>
      </MockedProvider>,
    );
    // expect(container).toHaveTextContent(/Please sign in/);
    expect(getByText(/Please sign in/)).toBeInTheDocument();
  });

  it('renders the child React node when the user is signed in.', async () => {
    const Child = () => <p>💩</p>;
    const { container } = render(
      <MockedProvider mocks={authUserMocks}>
        <UserProvider>
          <AuthChecker>
            <Child />
          </AuthChecker>
        </UserProvider>
      </MockedProvider>,
    );
    await waitFor(() => expect(container).toContainHTML('<p>💩</p>'));
  });
});
