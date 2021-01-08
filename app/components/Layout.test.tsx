import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUser } from '~app/__mocks__';
import { UserProvider } from '~app/hooks';
import { CURRENT_USER_QUERY, UPDATE_COLOR_MODE_MUTATION } from '~app/graphql';
import Layout from './Layout';

type GetByTestId = (text: string) => HTMLElement;

describe('<Layout />', () => {
  describe('while user is anonymous', () => {
    let container: Element;
    let getByTestId: GetByTestId;

    beforeEach(async () => {
      const anonymousMock = [
        {
          request: { query: CURRENT_USER_QUERY },
          result: { data: { me: null } },
        },
        {
          request: {
            query: UPDATE_COLOR_MODE_MUTATION,
            variables: { colorMode: 'LIGHT' },
          },
          result: { data: { colorMode: 'LIGHT' } },
        },
      ];
      ({ container, getByTestId } = render(
        <MockedProvider mocks={anonymousMock} addTypename={false}>
          <UserProvider>
            <Layout>...</Layout>
          </UserProvider>
        </MockedProvider>,
      ));
      await waitFor(() => 0);
    });

    it('renders proper layout for anonymous user', () => {
      expect(container).toMatchSnapshot();
      expect(container).toHaveTextContent('Sign in');
    });

    it('runs in default color mode', () => {
      expect(getByTestId('colorModeToggler')).toHaveAttribute(
        'data-theme',
        'LIGHT',
      );
    });

    it('toggles the color mode when the toggler is clicked', async () => {
      userEvent.click(getByTestId('colorModeToggler'));
      await waitFor(() => 0);
      expect(getByTestId('colorModeToggler')).toHaveAttribute(
        'data-theme',
        'DARK',
      );
    });
  });

  describe('while user is signed in', () => {
    let container: Element;
    let getByTestId: GetByTestId;

    beforeEach(async () => {
      const authUserMock = [
        {
          request: { query: CURRENT_USER_QUERY },
          result: { data: { me: mockUser({ colorMode: 'DARK' }) } },
        },
        {
          request: {
            query: UPDATE_COLOR_MODE_MUTATION,
            variables: { colorMode: 'LIGHT' },
          },
          result: { data: { colorMode: 'LIGHT' } },
        },
      ];
      ({ container, getByTestId } = render(
        <MockedProvider mocks={authUserMock.slice()} addTypename={false}>
          <UserProvider>
            <Layout>...</Layout>
          </UserProvider>
        </MockedProvider>,
      ));
      await waitFor(() => 0);
    });

    it('renders proper layout for signed user.', () => {
      expect(container).toMatchSnapshot();
      expect(container).toHaveTextContent('Sign out');
    });

    it('runs in user preferred color mode', () => {
      expect(getByTestId('colorModeToggler')).toHaveAttribute(
        'data-theme',
        'DARK',
      );
    });
  });
});
