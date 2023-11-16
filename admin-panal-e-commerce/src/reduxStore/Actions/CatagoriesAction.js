import {
    VIEW_CATAGORIES_DATA,
    UPDATE_CATAGORIES_DATA,
    DELETE_CATAGORY_DATA
} from './ActionTypes';


//view Catagory list
export const viewCatagoriesList = (payload) => {
    return {
        type: VIEW_CATAGORIES_DATA,
        payload
    };
};

//update catagory list
export const updateCatagoriesList = (payload) => {
    return {
        type: UPDATE_CATAGORIES_DATA,
        payload
    };
};

//delete catagory list
export const deleteCatagoriesList = (payload) => {
    return {
        type: DELETE_CATAGORY_DATA,
        payload
    };
};