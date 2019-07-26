import React from 'react';
import store from "../../store";
import {Provider} from "react-redux";
import { render } from '@testing-library/react';

export const renderWithRedux = component => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
}
