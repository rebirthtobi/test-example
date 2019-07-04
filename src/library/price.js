export const convertToCurrency = value => {
    const decimalValue = value / 100;
    return `$${decimalValue.toFixed(2)}`;
};
