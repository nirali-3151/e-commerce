import {
    VIEW_PRODUCT_DATA_FP,
    UPDATE_PRODUCT_DATA,
    DELETE_PRODUCT,
    VIEW_PRODUCT_DATA_ID
} from './ActionTypes';


//view product list firstpage
export const viewProductListFirstPage = (payload) => {
    return {
        type: VIEW_PRODUCT_DATA_FP,
        payload
    };
};

//update product list
export const updateProductList = (payload) => {
    return {
        type: UPDATE_PRODUCT_DATA,
        payload
    };
};

//delete product list
export const deleteProductList = (payload) => {
    return {
        type: DELETE_PRODUCT,
        payload
    };
};

//VIEW PRODUCT DETAIL WITH ID
export const viewProductDataId = (payload) => {
    return {
        type: VIEW_PRODUCT_DATA_ID,
        payload
    };
};