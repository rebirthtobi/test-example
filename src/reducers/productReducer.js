import * as productApi from '../library/productApi';

//*********************************************************
// Actions
//*********************************************************
export const LOAD_ALL_PRODUCT = 'LOAD_ALL_PRODUCT';

//*********************************************************
// State
//*********************************************************
export const initialState = {
    products: []
};

//*********************************************************
// Reducer
//*********************************************************
export default function reducer(state = initialState, action = {}) {
    const actions = {
        [LOAD_ALL_PRODUCT]: () => {
            const { products } = action.payload;

            return {
                ...state,
                products,
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

export const getProducts = (page) => {
    return dispatch => productApi.getProducts(page).then(products => {
        dispatch(loadAllProduct(products));
        return products;
    })
};

export const loadAllProduct = products => ({
    type: LOAD_ALL_PRODUCT,
    payload: {
        products,
    },
});
