export const convertToCurrency = value => {
    if (!value && value !== 0) {
        return null;
    }
    const decimalValue = value / 100;
    return `$${decimalValue.toFixed(2)}`;
};
