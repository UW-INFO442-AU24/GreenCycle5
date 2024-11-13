import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';

describe('Home Component', () => {
    test('renders the Welcome message', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const welcomeMessage = screen.getByText(/Welcome to GreeCycles!/i);
        expect(welcomeMessage).toBeInTheDocument();
    });
});