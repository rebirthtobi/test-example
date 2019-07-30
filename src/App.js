import React, {Fragment} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home/Home';
import Theme from "./components/Theme/Theme";
import store from './store';
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
    const supportsHistory = 'pushState' in window.history;
    return (
        <Provider store={store}>
            <BrowserRouter forceRefresh={!supportsHistory}>
                <Theme>
                    <Fragment>
                        <Header />
                        <Switch>
                            <Route exact path={'/products'} component={Home}/>
                            <Route exact path={'/cart'} component={Cart}/>
                            <Redirect from={'/'} to={'/products'} push={false} />
                        </Switch>
                        <Footer/>
                    </Fragment>
                </Theme>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
