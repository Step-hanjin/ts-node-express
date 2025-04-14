import { render, screen, fireEvent } from '@testing-library/react';
import FormDialoge from '../../../components/common/FormDialoge';

jest.mock('@mui/x-date-pickers/internals/demo', () => ({
    DemoContainer: ({ children }: any) => <div>{children}</div>
}));

describe('FormDialog', () => {
  const mockSaveData = jest.fn();

  const mockFormItems: Column[] = [
    { key: 'name', name: 'Name', type: 'input' },
    { key: 'monthJoined', name: 'Joined Month', type: 'month' },
    { key: 'signupDate', name: 'Signup Date', type: 'datetime' },
    {
      key: 'role',
      name: 'Role',
      type: {
        name: 'selector',
        items: [
          { id: 1, name: 'Admin' },
          { id: 2, name: 'User' },
        ],
      },
    },
  ];

  const mockFormData: Row = {
    id: 1,
    name: '',
    monthJoined: '',
    signupDate: '',
    role: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dialog and form fields correctly', async () => {
    render(
      <FormDialoge
        formData={mockFormData}
        formItems={mockFormItems}
        saveData={mockSaveData}
      >
        Add User
      </FormDialoge>
    );

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    // All form fields should now be visible
    expect(await screen.findByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/joined month/i)).toBeInTheDocument(); // ✅ Use getByText for MUI DateField
    expect(screen.getByText(/signup date/i)).toBeInTheDocument();  // ✅ Same
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();    // Works because InputLabel + Select
    
    // Save button should be there
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('fills out and submits form data', async () => {
    render(
      <FormDialoge
        formData={mockFormData}
        formItems={mockFormItems}
        saveData={mockSaveData}
      >
        Add User
      </FormDialoge>
    );

    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    const nameInput = await screen.findByLabelText(/name/i);
    
    const roleSelect = screen.getByLabelText(/role/i);
    const saveBtn = screen.getByRole('button', { name: /save/i });

    // Fill name
    fireEvent.change(nameInput, { target: { value: 'Alice' } });

    // Select role
    fireEvent.mouseDown(roleSelect); // opens dropdown
    const userOption = await screen.findByText('User');
    fireEvent.click(userOption);

    // Submit
    fireEvent.click(saveBtn);

    expect(mockSaveData).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Alice',
        role: '2',
      })
    );
  });
});
