import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Product from '../../components/Product/Product';
import { renderWithReduxAndRouter } from "../__MOCKS__/redux";

afterEach(cleanup);

describe('Testing the product component', () => {
    it('renders without crashing', () => {
        const { asFragment } = renderWithReduxAndRouter(<Product face="ᕙ༼ຈل͜ຈ༽ᕗ" price={342} size={34} id='3'/>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('display the smiley product details', () => {
        const { getByText } = renderWithReduxAndRouter(<Product face="ᕙ༼ຈل͜ຈ༽ᕗ" price={342} size={34} id='3'/>);

        expect(getByText('ᕙ༼ຈل͜ຈ༽ᕗ')).toBeTruthy();
        expect(getByText('Size:').nextElementSibling.textContent).toBe('34');
        expect(getByText('Price:').nextElementSibling.textContent).toBe('$3.42');
    });

    it.skip('respond to product click event', () => {
        const clickFunction = jest.fn(resp => resp);
        const { getByText } = renderWithReduxAndRouter(<Product face="ᕙ༼ຈل͜ຈ༽ᕗ" price={342} size={34} id="3" onClick={clickFunction} />);

        clickFunction.mockReturnValueOnce('3');
        fireEvent.click(getByText('ᕙ༼ຈل͜ຈ༽ᕗ'));

        expect(clickFunction).toHaveBeenCalled();
        expect(clickFunction).toHaveReturned();
        expect(clickFunction).toHaveReturnedWith('3');
    });
});
