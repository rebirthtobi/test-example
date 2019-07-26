import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    background-color: ${props => props.theme.primaryColor};
    padding: 0px 32px;
    height: 64px;
    display: flex;
`;

const BrandName = styled.h3`
    color: ${props => props.theme.textColor};
    display: inline-block;
    cursor: pointer;
    height: 100%;
    padding: 18px 0px;
    margin: 0;
`;

const Menu = styled.ul`
    margin: 0px 0px 0px auto;
    list-style: none;
    display: inline-flex;
    justify-content: flex-end;
`;

const MenuItem = styled.li`
    color: ${props => props.theme.textColor};
    height: 100%;
    text-align: center;
    padding: 0px 16px;
    font-size: 16px;
    font-weight: bold;
    line-height: 60px;
    cursor: pointer;
    
    :hover {
        background-color: ${props => props.theme.secondaryColor};
    }
`;

const Badge = styled.span`
    padding: 4px;
    background-color: ${props => props.theme.orangeColor};
    color: #fff;
    border-radius: 9px;
`;

class Header extends Component {
    static propTypes = {
        totalProductInCart: PropTypes.number.isRequired
    };

    render() {
        const { totalProductInCart } = this.props;

        // TODO: implement currently selected state for menu
        return (
            <Wrapper>
                <BrandName>Smiley Store</BrandName>
                <Menu>
                    <MenuItem>Products</MenuItem>
                    <MenuItem>Cart <Badge data-testid={'totalProductInCart'}>{totalProductInCart}</Badge></MenuItem>
                    <MenuItem>Login</MenuItem>
              </Menu>
          </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
   totalProductInCart: state.cart.products.length
});

export default connect(
    mapStateToProps,
    null
)(Header);
