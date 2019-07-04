import React from 'react';
import { render, cleanup, waitForDomChange } from "@testing-library/react";
import 'jest-dom/extend-expect';
import fetchMock from 'fetch-mock';
import Home from "./Home";

afterEach(cleanup);

describe('Testing the homepage', () => {
    it('renders without crashing', () => {
        const { asFragment, getByTestId } = render(<Home />);

        expect(asFragment()).toMatchSnapshot();
        expect(getByTestId('loader')).toHaveTextContent('Loading...');
    });

    it('renders fetches the products well enough', async () => {
        const fetchURL = 'http://localhost:3001/products?_page=1&_limit=18';
        fetchMock.get(fetchURL, {
            data: [
                {
                    face: "( .-. )",
                    size: 54,
                    price: 500,
                },
                {
                    face: "( .o.)",
                    size: 34,
                    price: 400,
                },
                {
                    face: "( ° ͜ ʖ °)",
                    size: 35,
                    price: 700,
                },
            ],
        });
        const { asFragment, getByTestId, debug } = render(<Home />);

        expect(asFragment()).toMatchSnapshot();
        expect(getByTestId('loader')).toHaveTextContent('Loading...');

        await waitForDomChange();
        debug();
        const products = getByTestId('products').childNodes;

        expect(fetchMock.get).toHaveBeenCalled();
        expect(fetchMock.get).toHaveBeenCalledWith(fetchURL);
        expect(getByTestId('loader')).toBeFalsy();
        expect(products.length).toBe(3);
    });
});