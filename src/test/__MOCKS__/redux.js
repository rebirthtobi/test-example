import React from 'react';
import store from "../../store";
import {Provider} from "react-redux";
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';

export const renderWithReduxAndRouter = component => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    return {
        ...render(
            <Provider store={store}>
                <Router history={history}>
                    {component}
                </Router>
            </Provider>
        ),
        store,
    }
}
