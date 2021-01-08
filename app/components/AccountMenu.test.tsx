import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import { mockUser } from '~app/__mocks__';
import { CURRENT_USER_QUERY } from '~app/graphql';

import AccountMenu from './AccountMenu';

describe('<AccountMneu />', () => {
  it('renders account menu for anonymous users.', () => {
    const { getByText, unmount } = render(<AccountMenu hasAuthUser={false} />);
    expect(getByText('Sign in')).toBeInTheDocument();
    unmount();
  });

  it('renders account menu for signed users.', () => {
    const authUserMocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: mockUser() } },
      },
    ];
    const { getByText, unmount } = render(
      <MockedProvider mocks={authUserMocks} addTypename={false}>
        <AccountMenu hasAuthUser />
      </MockedProvider>,
    );
    expect(getByText('Sign out')).toBeInTheDocument();
    unmount();
  });
});
