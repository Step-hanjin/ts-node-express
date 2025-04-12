import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App component', () => {
  it('renders Header, Sidebar, and MainContent', () => {
    render(
      <MemoryRouter initialEntries={['/countries']}>
        <App />
      </MemoryRouter>
    );

    // Checks if the Header contains the title
    expect(screen.getByText('Countries')).toBeInTheDocument();

    // Checks if Sidebar items appear (depends on sidebarItemList content)
    // If the list contains "Countries", check it like:
    expect(screen.getByText(/Countries/i)).toBeInTheDocument();

    // You can also check for feature component content if they render something specific
  });
});
