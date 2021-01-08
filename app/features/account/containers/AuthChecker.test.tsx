import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

import { mockUser } from '~app/__mocks__';
import { UserProvider } from '~app/hooks';
import { CURRENT_USER_QUERY } from '~app/graphql';
import AuthChecker from './AuthChecker';

describe('<AuthChecker />', () => {
  it('renders a please sign in dialog to anonymous users.', async () => {
    const anonymousMocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: null } },
      },
    ];
    const { container } = render(
      <MockedProvider mocks={anonymousMocks} addTypename={false}>
        <UserProvider>
          <AuthChecker>💩</AuthChecker>
        </UserProvider>
      </MockedProvider>,
    );

    await waitFor(() => 0);
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Please sign in');
  });

  it('renders the child React node when the user is signed in.', async () => {
    const authUserMocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: mockUser() } },
      },
    ];
    const { container } = render(
      <MockedProvider mocks={authUserMocks} addTypename={false}>
        <UserProvider>
          <AuthChecker>
            <p>💩</p>
          </AuthChecker>
        </UserProvider>
      </MockedProvider>,
    );

    await waitFor(() => 0);
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('💩');
  });
});
