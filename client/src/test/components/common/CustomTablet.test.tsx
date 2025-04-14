import { render, screen } from '@testing-library/react';

jest.mock('@mui/x-date-pickers/internals/demo', () => ({
    DemoContainer: () => <div>Mocked DemoContainer</div>,
    DemoItem: () => <div>Mocked DemoItem</div>,
  }));
  
import CustomTable from '../../../components/common/CustomTable';
import { Provider } from 'react-redux';
import store  from '../../../../src/app/store';

describe('CustomTable', () => {
    const mockHeaderItems = [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Name' },
    ];

    const mockData = [
        { id: 1, name: 'China' },
        { id: 2, name: 'Russia' },
    ];

    const mockSave = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();

    test('renders table with headers and rows', () => {
        render(
            <Provider store={store}>
                <CustomTable
                    title="Country"
                    headerItems={mockHeaderItems}
                    tableData={mockData}
                    saveRow={mockSave}
                    editRow={mockEdit}
                    deleteRow={mockDelete}
                />
            </Provider>
        );

        // Check header
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect (screen.getByText('Action')).toBeInTheDocument();

        // Check rows
        expect(screen.getByText('China')).toBeInTheDocument();
        expect(screen.getByText('Russia')).toBeInTheDocument();

        // Check action buttons
        expect(screen.getAllByText('Edit').length).toBe(2);
        expect(screen.getAllByText('Delete').length).toBe(2);

        // Check add button
        expect(screen.getByText('Add Country')).toBeInTheDocument();
    });
});
