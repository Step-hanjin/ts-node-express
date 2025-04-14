import { render, screen, fireEvent } from "@testing-library/react";
import FormDialog from "../../../components/common/FormDialoge";

jest.mock('@mui/x-date-pickers/internals/demo', () => ({
    DemoContainer: () => <div>Mocked DemoContainer</div>,
    DemoItem: () => <div>Mocked DemoItem</div>,
  }));

describe('FormDialog', () => {
    const mockFormData : Row = {
        id: 1,
        name: 'China'
    };

    const mockFormItems : Column[] = [
        {
            key: 'id',
            name: 'ID',
            type: 'input'
        },
        {
            key: 'name',
            name: 'Name',
            type: 'input'
        }
    ];

    const mockSaveData = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
      });

    test('renders the button and opens the dialog', async () => {
        render(
            <FormDialog
                formData={mockFormData}
                formItems={mockFormItems}
                saveData={mockSaveData}
            >
                Add country
            </FormDialog>         
        );

        // Verify button exists
        const openButton = screen.getByRole('button', { name: /add country/i });
        expect(openButton).toBeInTheDocument();

        // Open the dialog
        fireEvent.click(openButton);

        // Now we expect the dialog with inputs to be present
        expect(await screen.findByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
});