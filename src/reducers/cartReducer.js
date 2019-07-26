

//*********************************************************
// Actions
//*********************************************************
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

//*********************************************************
// State
//*********************************************************
const initialState = {
    products: []
};

//*********************************************************
// Reducer
//*********************************************************
export default function reducer(state = initialState, action = {}) {
    const actions = {
        [ADD_PRODUCT_TO_CART]: () => {
            const { productId } = action.payload;
            const isAlreadyInCart = state.products.find(product => product.productId === productId);
            const quantityIncrementalValue = 1;

            if (isAlreadyInCart) {
                return {
                    products: state.products.map(product => {
                        return product.productId === productId
                            ? {
                                productId: product.productId,
                                quantity: product.quantity + quantityIncrementalValue
                            }
                            : product
                    })
                }
            }

            return {
                ...state,
                products: [...state.products, {productId, quantity: quantityIncrementalValue}],
            };
        },
        [REMOVE_PRODUCT_FROM_CART]: () => {
            const { productId } = action.payload;
            const filteredProducts = state.products.filter(product => product.productId !== productId);

            return {
                ...state,
                products: filteredProducts,
            };
        },
        [CLEAR_CART]: () => {

            return {
                ...state,
                products: initialState,
            };
        },
        default: () => {
            return state;
        },
    };
    return (actions[action.type] || actions['default'])();
}

//*********************************************************
// Action Creators
//*********************************************************

export const addProductToCart = (productId) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: {
        productId,
    },
});

export const removeProductFromCart = (productId) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: {
        productId,
    },
});

export const clearCart = () => ({
    type: CLEAR_CART
});
