import { render } from '@testing-library/react';

import SuccessMessage from './SuccessMessage';

describe('<SuccessMessage />', () => {
  it('renders nothing with no error object provided.', () => {
    const { container } = render(
      <SuccessMessage isSuccessful={false} message="😉" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders an alert box when .', () => {
    const { container } = render(<SuccessMessage isSuccessful message="😉" />);
    expect(container).toHaveTextContent('😉');
  });
});
