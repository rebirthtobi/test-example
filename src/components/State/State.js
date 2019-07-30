import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Icon = styled.span`
    font-size: 150px;
    color: ${props => props.isError ? props.theme.orangeColor : props.theme.greyColor};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.greyColor};
`;

class BasicState extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        isError: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isError: false
    };

    render() {
        const { text, isError, icon } = this.props;
        return (
            <Container>
                <Icon isError={isError}>
                    <i className={icon} />
                </Icon>
                <Text> {text} </Text>
            </Container>
        )
    }
}

export const EmptyState = ({emptyText}) => <BasicState text={emptyText} icon={'far fa-file-excel'} />;

export const ErrorState = ({errorText}) => <BasicState text={errorText} icon={'fas fa-exclamation-triangle'} isError />;
