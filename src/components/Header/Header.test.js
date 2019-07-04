import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Header from './Header';

afterEach(cleanup);

describe('Testing Header Component', () => {
    it('runs render without crashing', () => {
        const { asFragment } = render(<Header />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should have the brand', () => {
        const { container } = render(<Header />);

        expect(container.querySelector('h3')).toHaveTextContent('Smiley Store');
    });

    it('should have the menu items', () => {
        const { container } = render(<Header />);
        const menuTags = container.querySelectorAll('li');
        const menusNames = ['Home', 'Products', 'Cart', 'Login'];

        expect(menuTags.length).toBeTruthy();
        menuTags.forEach((menu) => {
            expect(menusNames).toContain(menu.textContent);
        });
    });
});
