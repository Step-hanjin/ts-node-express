// import { render, screen } from "@testing-library/react";
// import CountryComponent from "../../../components/features/countryComponent";
// import { useDispatch, useSelector } from 'react-redux';
// import * as countryActions from '../../../features/countrySlice';

// // Mock MUI component if needed
// jest.mock('@mui/x-date-pickers/internals/demo', () => ({
//   DemoContainer: ({ children }: any) => <div>{children}</div>
// }));

// // Mock Redux slice actions
// jest.mock("../../../features/countrySlice", () => ({
//   fetchCountries: jest.fn(() => ({ type: "countries/fetchCountries" })),
//   createCountry: jest.fn(() => ({ type: "countries/createCountry" })),
//   updateCountry: jest.fn(() => ({ type: "countries/updateCountry" })),
//   deleteCountry: jest.fn(() => ({ type: "countries/deleteCountry" })),
// }));

// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// const mockDispatch = jest.fn();
// const mockCountries = [
//   { id: 1, name: "USA" },
//   { id: 2, name: "Canada" }
// ];

// // Assign our mocks properly
// beforeEach(() => {
//     (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
//     (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
//       selectorFn({ country: { countries: mockCountries } })
//     );
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

// describe('CountryComponent', () => {
//   it("renders the CustomTable title", () => {
//     render(<CountryComponent />);
//     expect(screen.getByText(/countries/i)).toBeInTheDocument();
//   });

//   it("dispatches fetchCountries on mount", () => {
//     render(<CountryComponent />);
//     expect(countryActions.fetchCountries).toHaveBeenCalled();
//     expect(mockDispatch).toHaveBeenCalledWith({ type: "countries/fetchCountries" });
//   });

//   it("renders countries from the store", () => {
//     render(<CountryComponent />);
//     expect(screen.getByText(/USA/i)).toBeInTheDocument();
//     expect(screen.getByText(/Canada/i)).toBeInTheDocument();
//   });
// });
