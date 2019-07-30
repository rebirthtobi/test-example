import React from 'react';
import { cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Header from '../../components/Header/Header';
import { renderWithReduxAndRouter } from '../__MOCKS__/redux';

afterEach(cleanup);

describe('Testing Header Component', () => {
    it('runs render without crashing', () => {
        const { asFragment } = renderWithReduxAndRouter(<Header />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should have the brand', () => {
        const { container } = renderWithReduxAndRouter(<Header />);

        expect(container.querySelector('h3')).toHaveTextContent('Smiley Store');
    });

    it('should have the menu items', () => {
        const { container } = renderWithReduxAndRouter(<Header />);
        const menuTags = container.querySelectorAll('a');
        const menusNames = ['Home', 'Products', 'Cart 0', 'Login'];

        expect(menuTags.length).toBeTruthy();
        menuTags.forEach((menu) => {
            expect(menusNames).toContain(menu.textContent);
        });
    });

    it('should have the total item in cart badge be zero', () => {
        const { getByTestId } = renderWithReduxAndRouter(<Header totalProductInCart={0}/>);

        expect(getByTestId('totalProductInCart')).toHaveTextContent('0');
    });
});
