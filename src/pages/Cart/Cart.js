import React, {Component, Fragment} from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styled from 'styled-components';
import {convertToCurrency} from "../../library/price";
import {EmptyState} from '../../components/State/State';
import { changeProductQuantityInCart } from '../../reducers/cartReducer';

const Container = styled.div`
    width: 80%
    margin: auto;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const TableContainer = styled.table`
    border-collapse: collapse;
    text-align: center;
    border-bottom: 2px solid ${props => props.theme.secondaryColor};
    width: 60%;
`;

const TableHeader = styled.th`
    font-size: 14px;
`;

const TableRow = styled.tr`
    padding: 8px;
    
    :first-child {
        border: 2px solid ${props => props.theme.secondaryColor};
        border-right: 2px none;
        border-left: 2px none;
    }
    
    :not(:first-child) {
        & td {
            padding: 16px;
        }
    }
`;

const Face = styled.span`
    font-weight: bold;
    font-size: 26px;
`;

const CartDetailsWrapper = styled.div`
    display: flex;
    
    & table:last-child {
        margin-left: auto;
        width: 20%;
        
        tr:last-child {
            border-top: 2px solid #000;
        }
    }
`;

const ControlWrapper = styled.div`
    display: flex;
    width: max-content;
    border: 1px solid ${props => props.theme.greyColor};
`;

const Input = styled.input`
    border: 1px solid ${props => props.theme.greyColor};
    border-width: 0px 1px;
    padding: 4px;
    flex: 1;
    text-align: center;
`;

const Icon = styled.span`
    font-size: 12px;
    width: 30px;
    background-color: ${props => props.theme.ghostWhiteColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

class Cart extends Component {
    static propTypes = {
        products: PropTypes.array.isRequired
    };

    onQuantityChange = (event, id) => {
        console.log('change');
        const quantity = event.target.value;
        const { changeProductQuantityInCart } = this.props;

        if (!Number.isNaN(quantity) && !isNaN(quantity) && quantity) {
            changeProductQuantityInCart(id, Number(quantity));
        }
    };

    onQuantityIncrease = (quantity, id) => {
        console.log('increase');
        const { changeProductQuantityInCart } = this.props;
        changeProductQuantityInCart(id, quantity + 1);
    };

    onQuantityDecrease = (quantity, id) => {
        console.log('decrease');
        const { changeProductQuantityInCart } = this.props;
        const newQuantity = quantity - 1;

        if (newQuantity >= 1) {
            changeProductQuantityInCart(id, newQuantity);
        }
    };

    renderCartItem = product => {
        const { face, id, size, price, quantity } = product;
        return (
            <TableRow>
                <td><Face> {face} </Face></td>
                <td> {size} </td>
                <td> {convertToCurrency(price)} </td>
                <td>
                    <ControlWrapper>
                        <Icon onClick={() => this.onQuantityIncrease(quantity, id)}><i className={'fas fa-plus'} /></Icon>
                        <Input value={quantity} type={'number'} onChange={event => this.onQuantityChange(event, id)}/>
                        <Icon onClick={() => this.onQuantityDecrease(quantity, id)}><i className={'fas fa-minus'} /></Icon>
                    </ControlWrapper>
                </td>
                <td> {convertToCurrency(quantity * price)} </td>
            </TableRow>
        )
    };

    getCartProductsWithDetails = (products, cartItems) => {
        const cartItemsId = _.pluck(cartItems, 'productId');
        return products.filter(product => cartItemsId.includes(product.id))
                .map(product => ({
                    ...product,
                    quantity: cartItems.find(item => item.productId === product.id).quantity
                }));
    };

    getSubTotalPrice = cartProducts => cartProducts.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);

    getVAT = subTotalPrice => (subTotalPrice * 5) / 100;

    renderCartDetails = cartItems => {
        const { products } = this.props;
        const cartProducts = this.getCartProductsWithDetails(products, cartItems);
        const subTotalPrice = this.getSubTotalPrice(cartProducts);
        const vat = this.getVAT(subTotalPrice);

        return (
            <Fragment>
                <h3>You have {cartItems.length} products in your cart</h3>
                <CartDetailsWrapper data-testid={'cartItemContainer'}>
                    <TableContainer>
                        <TableRow>
                            <TableHeader>Face</TableHeader>
                            <TableHeader>Size</TableHeader>
                            <TableHeader>Price (per unit)</TableHeader>
                            <TableHeader>Quantity</TableHeader>
                            <TableHeader>Total Price</TableHeader>
                        </TableRow>
                        {cartProducts.map(product => this.renderCartItem(product))}
                    </TableContainer>
                    <TableContainer>
                        <TableRow>
                            <th colSpan={2}> Checkout Summary </th>
                        </TableRow>
                        <TableRow>
                            <th> Sub-Total </th>
                            <td> {convertToCurrency(subTotalPrice)} </td>
                        </TableRow>
                        <TableRow>
                            <th> VAT (5%) </th>
                            <td> {convertToCurrency(vat)} </td>
                        </TableRow>
                        <TableRow>
                            <th> Total </th>
                            <td> {convertToCurrency(subTotalPrice + vat)} </td>
                        </TableRow>
                    </TableContainer>
                </CartDetailsWrapper>
            </Fragment>
        )
    };

    render() {
        const { cartItems } = this.props;

        return (
            <Container>
                {!cartItems.length
                    ? <EmptyState emptyText={'No products added to cart yet'}/>
                    : this.renderCartDetails(cartItems)
                }
            </Container>
        )
    }
}

const matchStateToProps = state => ({
    cartItems: state.cart.products,
    products: state.product.products
});

const matchDispatchToProps = {
    changeProductQuantityInCart
};

export default connect(
    matchStateToProps,
    matchDispatchToProps
)(Cart)
