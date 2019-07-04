import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Product from '../../components/Product/Product';
import request from '../../library/api';
import { PRODUCT_URL, PRODUCT_LIMIT } from '../../library/constant';

const Container = styled.div`
    width: 80%
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 8px;
    padding-bottom: 8px;
`;

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            page: 1
        }
    }

    componentDidMount() {
        const { page } = this.state;
        request(`${PRODUCT_URL}?_page=${page}&_limit=${PRODUCT_LIMIT}`, {
            method: 'GET',
        }).then(products => {
            this.setState({
                isLoading: false,
                products
            })
        }).catch(() => {
            this.setState({
                isLoading: false,
                isLoadingError: true
            })
        });
    }

    addToCart = () => {
        //TODO: add products to cart
    }

    renderProducts = products => (
        <Container data-testid="products">
            {products && products.map(product => {
                const { size, price, id, face } = product;
                return <Product size={size} price={price} onClick={this.addToCart} id={id} face={face} key={id} />
            })}
        </Container>
    )

    render() {
        const { isLoading, products } = this.state;

        return (
            <Fragment>
                <Header />
                {isLoading ? <div data-testid={'loader'}>Loading...</div> : this.renderProducts(products)}
                <Footer />
            </Fragment>
        )
    }
}