import request from './api';
import {PRODUCT_URL} from "./constant";

// TODO the test for this
export const getProducts = (page = 1, productPerPage = 18) => {
    return request(`${PRODUCT_URL}?_page=${page}&_limit=${productPerPage}`, {
        method: 'GET',
    });
};
