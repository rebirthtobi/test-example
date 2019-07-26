import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Product from '../../components/Product/Product';
import { getProducts } from "../../reducers/productReducer";

const Container = styled.div`
    width: 80%
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 8px;
    padding-bottom: 8px;
`;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            page: 1
        }
    }

    componentDidMount() {
        const { page } = this.state;
        const { getProducts } = this.props;

        getProducts(page).then(products => {
            this.setState({
                isLoading: false,
                products
            });
        }).catch(() => {
            // TODO: change this to Toast Error and implement error state
            this.setState({
                isLoading: false,
                isLoadingError: true
            });
        });
    }

    static propTypes = {
        getProducts: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired
    };

    renderProducts = products => (
        <Container data-testid="products">
            {products && products.map(product => {
                const { size, price, id, face } = product;
                return <Product size={size} price={price} id={id} face={face} key={id} />
            })}
        </Container>
    );

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

const mapStateToProps = state => ({
    products: state.product.products
});

const mapDispatchToProps = {
  getProducts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
