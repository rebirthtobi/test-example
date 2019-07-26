import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaceMenu from './components/FaceMenu/FaceMenu';
import { convertToCurrency } from '../../library/price';

const Container = styled.div`
    width: 30%;
    margin: 8px 1.5%;
    border-radius: 9px;
    background-color: ${props => props.theme.ghostWhiteColor};
    border: 1px solid ${props => props.theme.greyColor};
`;

const Face = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    padding-top: 22px;
    padding-bottom: 22px;
    position: relative;
`;

const Details = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${props => props.theme.greyColor};
`;

const DetailsItem = styled.div`
    display: flex;
    flex: 1;
    padding: 8px;
    border-left: ${props => props.isRight ? '1px' : '0px'} solid ${props => props.theme.greyColor};
`;

const DetailsDescription = styled.span`
    flex: 1;
    color: ${props => props.theme.primaryColor};
    font-family: 'monospace';
    align-self: flex-start;
`;

const DetailsValue = styled.span`
    flex: 1;
    color: ${props => props.theme.primaryColor};
    font-family: 'sans-serif';
    align-self: flex-end;
`;

const Product = ({ id, face, price, size }) => (
    <Container>
        <Face>
            {face}
            <FaceMenu faceId={id} />
        </Face>
        <Details>
            <DetailsItem>
                <DetailsDescription>
                    Size:
                </DetailsDescription>
                <DetailsValue>
                    {size}
                </DetailsValue>
            </DetailsItem>
            <DetailsItem isRight>
                <DetailsDescription>
                    Price:
                </DetailsDescription>
                <DetailsValue>
                    {convertToCurrency(price)}
                </DetailsValue>
            </DetailsItem>
        </Details>
    </Container>
)

Product.propTypes = {
    id: PropTypes.string.isRequired,
    face: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
};

export default Product;
