import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from '../../components/Footer/Footer';

afterEach(cleanup);

describe('Testing Footer', () => {
    it('renders foooter without crashing', () => {
        const { asFragment, getByText } = render(<Footer />);

        expect(asFragment()).toMatchSnapshot();
        expect(getByText('with love for testing example')).toBeTruthy();
    });
});
