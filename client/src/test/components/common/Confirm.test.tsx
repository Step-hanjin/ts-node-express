// Confirm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Confirm from '../../../components/common/Confirm';
import { Provider } from 'react-redux';
import store from '../../../app/store';

describe('Confirm Dialog', () => {
  const mockDelete = jest.fn();
  const mockData = { id: 1, name: 'Test User' };

  beforeEach(() => {
    mockDelete.mockClear();
  });

  it('renders button and opens dialog on click', () => {
    render(
        <Provider store={store}>
            <Confirm data={mockData} deleteData={mockDelete}>
                Delete
            </Confirm>
        </Provider>
    );

    // Button should be in the document
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeInTheDocument();

    // Click the button to open dialog
    fireEvent.click(button);

    // Dialog content should now appear
    expect(screen.getByText(/delete data/i)).toBeInTheDocument();
    expect(screen.getByText(/do you want to delete this row/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });

  it('calls deleteData with correct ID on clicking Yes', () => {
    render(
      <Confirm data={mockData} deleteData={mockDelete}>
        Delete
      </Confirm>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('does not call deleteData on clicking No', () => {
    render(
      <Confirm data={mockData} deleteData={mockDelete}>
        Delete
      </Confirm>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    fireEvent.click(screen.getByRole('button', { name: /no/i }));

    expect(mockDelete).not.toHaveBeenCalled();
  });
});
