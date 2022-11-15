import {render, screen} from '@testing-library/react';

import NotFoundPage from 'components/NotFoundPage';

test('renders not found page', () => {
  render(<NotFoundPage />);

  const headerElement = screen.getByText(/Not found/i);

  expect(headerElement).toBeInTheDocument();
});
