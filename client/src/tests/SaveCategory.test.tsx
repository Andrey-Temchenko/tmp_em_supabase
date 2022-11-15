import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SaveCategory from 'components/categories/components/SaveCategory';

test('renders save category modal and close on save button click', async () => {
  const category: Category = {
    id: 1,
    title: 'Food',
    description: 'Food category',
    userId: '1'
  };

  const user = userEvent.setup();
  const handleClose = jest.fn();

  render(
    <SaveCategory category={category} visible save={() => null} onChange={(field, value) => null} close={handleClose} />
  );

  const titleInput = screen.getByDisplayValue(category.title);
  expect(titleInput).toBeInTheDocument();

  await user.click(screen.getByRole('button', {name: /Cancel/i}));
  expect(handleClose).toHaveBeenCalledTimes(1);
});
