import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from './components/Home/Home';

test('renders Welcome message', () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
    const welcomeMessage = screen.getByText(/Welcome to GreeCycles!/i);
    expect(welcomeMessage).toBeInTheDocument();
});