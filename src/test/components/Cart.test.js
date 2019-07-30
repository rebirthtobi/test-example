import React from 'react';
import { cleanup } from "@testing-library/react";
import { renderWithReduxAndRouter } from "../__MOCKS__/redux";
import Cart from '../../pages/Cart/Cart';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Testing Cart Page', () => {
    it('should render without crashing', () => {
        const { asFragment, store, getByTestId } = renderWithReduxAndRouter(<Cart />);
        const totalProductsInCart = store.getState().cart.products.length;

        expect(asFragment()).toMatchSnapshot();
        expect(getByTestId('cartItemContainer').childNodes.length).toBe(totalProductsInCart);
    });

    it.skip('should display each product well', () => {
        const { getByTestId } = renderWithRedux(<Cart />);
        const cartItemsNodes = getByTestId('cartItemContainer').childNodes;

        // cartItemsNodes.
    });
});
