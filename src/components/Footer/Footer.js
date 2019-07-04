import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.textColor};
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = () => (
    <Wrapper>
        with love for testing example
    </Wrapper>
);

export default Footer;
