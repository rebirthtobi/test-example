import React from 'react';
import { Provider } from 'react-redux';
import Home from './pages/Home/Home';
import Theme from "./components/Theme/Theme";
import store from './store';

const App = () => (
    <Provider store={store}>
        <Theme>
            <Home />
        </Theme>
    </Provider>
);

export default App;
