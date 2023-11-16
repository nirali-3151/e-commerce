import  {
    GET_ID_VIEW_CATAGORY,
    VIEW_SUB_CATAGORY_DATA,
    UPDATE_SUB_CATAGORIES_DATA,
    DELETE_SUB_CATAGORY_DATA
} from "./ActionTypes"

// save id of catagory(based on that view sub catagory)
export const getIdViewCatagory = (payload) => {
    return {
        type: GET_ID_VIEW_CATAGORY,
        payload
    };
}

//view sub Catagory list
export const viewSubCatagoriesList = (payload) => {
    return {
        type: VIEW_SUB_CATAGORY_DATA,
        payload
    };
};

//update sub catagory list
export const updateSubCatagoriesList = (payload) => {
    return {
        type: UPDATE_SUB_CATAGORIES_DATA,
        payload
    };
};

//delete sub catagory list
export const deleteSubCatagoriesList = (payload) => {
    return {
        type: DELETE_SUB_CATAGORY_DATA,
        payload
    };
};