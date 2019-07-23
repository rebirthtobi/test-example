import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import FaceMenu from './FaceMenu';

afterEach(cleanup);

describe('FaceMenu works as expected', () => {
    it('renders without any error', () => {
        const { asFragment, queryByText } = render(<FaceMenu faceId={'45'} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Add to Cart')).toBeFalsy();
        expect(queryByText('Share Product')).toBeFalsy();
        expect(queryByText('Share Face')).toBeFalsy();
    });

    it('show context menu clicks', () => {
        const { asFragment, getByTestId, queryByText } = render(<FaceMenu faceId={'45'} />);


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
});
