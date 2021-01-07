import type { ApolloError } from '@apollo/client';
import { render } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('renders nothing with no error object provided.', () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toBeNull();
  });

  it('renders an alert box when .', () => {
    const apolloErrorMock = {
      message: 'GraphQL error: 😨',
    } as ApolloError;
    const { container } = render(<ErrorMessage error={apolloErrorMock} />);
    expect(container).toHaveTextContent('😨');
    expect(container).not.toHaveTextContent('GraphQL error');
  });
});
