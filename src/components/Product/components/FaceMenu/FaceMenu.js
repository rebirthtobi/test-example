import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from "react-redux";
import { addProductToCart } from "../../../../reducers/cartReducer";

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: max-content;
    z-index: 900;
`;

const MenuHolder = styled.div`
    position: absolute;
    bottom: auto;
    background-color: #fff;
    width: max-content;
    z-index: 1000;
    border-radius: 9px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
`;

const MenuItem = styled.span`
    display: block;
    color: #000;
    padding: 8px;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    
    :hover {
        background-color: ${props => props.theme.ghostWhiteColor};
    }
`;

const Icon = styled.span`
    color: #000;
    font-size: 16px;
    margin: 8px;
    cursor: pointer;
`;

class FaceMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        };
        this.menuRef = React.createRef();
    }

    static propTypes = {
        faceId: PropTypes.string.isRequired,
        addProductToCart: PropTypes.func.isRequired
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.closeMenuModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeMenuModal, false);
    }

    addToCart = () => {
        const { addProductToCart, faceId } = this.props;
        addProductToCart(faceId);
        this.toggleMenuOptions();
        // TODO: send notification that product is added to cart
    };

    shareProduct = () => {};

    shareFace = () => {};

    closeMenuModal = event => {
        if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
            this.setState({isMenuOpen: false});
        }
    };


    toggleMenuOptions = () => this.setState(prevState => ({isMenuOpen: !prevState.isMenuOpen}));

    renderMenus = isMenuOpen => {
        if (isMenuOpen) {
            return (
                <MenuHolder ref={this.menuRef}>
                    <MenuItem onClick={this.addToCart} data-testid={'addToCart'}>Add to Cart</MenuItem>
                    <MenuItem onClick={this.shareProduct}>Share Product</MenuItem>
                    <MenuItem onClick={this.shareFace}>Share Face</MenuItem>
                </MenuHolder>
            )
        }
    };

    render() {
        const { isMenuOpen } = this.state;

        return (
            <Container>
                <Icon onClick={this.toggleMenuOptions} data-testid={'menuIcon'} >
                    <i className={'fas fa-ellipsis-v'} />
                </Icon>
                {this.renderMenus(isMenuOpen)}
            </Container>
        )
    }
}

const mapDispatchToProps = {
    addProductToCart
};

export default connect(
    null,
    mapDispatchToProps
)(FaceMenu);
