import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import PropTypes from 'prop-types';

export default class Theme extends Component {
    static defaultProps = {
        theme: {
            primaryColor: '#000000',
            secondaryColor: '#474747',
            textColor: '#ffffff',
            greyColor: '#576372',
            blueColor: '#0066A1',
            ghostWhiteColor: '#f8f9fd',
            orangeColor: '#EE7679',
        },
    };

    static propTypes = {
        theme: PropTypes.shape({
            primaryColor: PropTypes.string,
            greyColor: PropTypes.string,
            blueColor: PropTypes.string,
            ghostWhiteColor: PropTypes.string,
            orangeColor: PropTypes.string,
        }).isRequired,
        children: PropTypes.element.isRequired
    };

    render() {
        const { children, theme } = this.props;
        return (
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        )
    }
}
