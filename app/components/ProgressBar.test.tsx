import { render } from '@testing-library/react';
// import { render, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Link from 'next/link';

import ProgressBar from './ProgressBar';

describe('<ProgressBar />', () => {
  it('should render an empty bar by default', async () => {
    const { getByRole } = render(<ProgressBar />);
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  // it('should render an animating bar on route change', async () => {
  //   const { getByRole, getByTestId } = render(
  //     <>
  //       <ProgressBar />
  //       <Link href="/login">
  //         <a data-testid="link">Go</a>
  //       </Link>
  //     </>,
  //   );
  //   userEvent.click(getByTestId('link'));
  //   await waitFor(() =>
  //     expect(getByRole('progressbar')).not.toHaveAttribute(
  //       'aria-valuenow',
  //       '0',
  //     ),
  //   );
  // });
});
