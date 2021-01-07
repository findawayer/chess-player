import type { ReactNode } from 'react';

// Mock `window.matchMedia`
// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock next/link with prefetch.
// https://github.com/vercel/next.js/issues/16864#issuecomment-702069418
jest.mock('next/link', () => ({ children }: { children: ReactNode }) =>
  children,
);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      basePath: '',
      pathname: '/',
      route: '/',
      asPath: '/',
      query: {},
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

export {};
