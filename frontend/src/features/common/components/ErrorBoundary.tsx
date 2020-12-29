import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Display errors. Do NOT include fancy styles as they might
 * cause another error themselves.
 */
const ErrorBoundaryMessage: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>Something went wrong. Please refresh x_X</h2>
  </div>
);

/**
 * Wrapper component that displays an error message when React detected an error
 * inside the child node tree.
 *
 * Class component is used because `getDerivedStateFromError`, `componentDidCatch`
 * methods are not implemented in React hooks.
 *
 * @example
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown): void {
    console.error(error, errorInfo);
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? <ErrorBoundaryMessage /> : children;
  }
}
