import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import FaceMenu from '../../components/Product/components/FaceMenu/FaceMenu';
import { renderWithReduxAndRouter } from '../__MOCKS__/redux';
import Header from "../../components/Header/Header";

afterEach(cleanup);

describe('FaceMenu works as expected', () => {
    it('renders without any error', () => {
        const { asFragment, queryByText } = renderWithReduxAndRouter(<FaceMenu faceId={'45'} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Add to Cart')).toBeFalsy();
        expect(queryByText('Share Product')).toBeFalsy();
        expect(queryByText('Share Face')).toBeFalsy();
    });

    it('show context menu clicks', () => {
        const { asFragment, getByTestId, queryByText } = renderWithReduxAndRouter(<FaceMenu faceId={'45'} />);


        expect(asFragment()).toMatchSnapshot();

        fireEvent.click(getByTestId('menuIcon'));

        expect(queryByText('Add to Cart')).toBeTruthy();
        expect(queryByText('Share Product')).toBeTruthy();
        expect(queryByText('Share Face')).toBeTruthy();

        fireEvent.click(getByTestId('menuIcon'));

        expect(queryByText('Add to Cart')).toBeFalsy();
        expect(queryByText('Share Product')).toBeFalsy();
        expect(queryByText('Share Face')).toBeFalsy();
    });

    it('Should add item to cart correctly', () => {
        const { getByTestId } = renderWithReduxAndRouter(<FaceMenu faceId={'45'} />);
        const { container, store } = renderWithReduxAndRouter(<Header />);
        const menuTags = container.querySelectorAll('a');
        const menusNames = ['Home', 'Products', 'Cart 0', 'Login'];
        const menusNamesWithCartItem = ['Home', 'Products', 'Cart 1', 'Login'];

        expect(menuTags.length).toBeTruthy();
        menuTags.forEach((menu) => {
            expect(menusNames).toContain(menu.textContent);
        });

        fireEvent.click(getByTestId('menuIcon'));
        fireEvent.click(getByTestId('addToCart'));

        menuTags.forEach((menu) => {
            expect(menusNamesWithCartItem).toContain(menu.textContent);
        });

        fireEvent.click(getByTestId('menuIcon'));
        fireEvent.click(getByTestId('addToCart'));

        expect(store.getState().cart.products[0].quantity).toBe(2);
    });
});
