import {
    GET_ID_VIEW_CATAGORY,
    VIEW_SUB_CATAGORY_DATA,
    UPDATE_SUB_CATAGORIES_DATA,
    DELETE_SUB_CATAGORY_DATA
} from '../Actions/ActionTypes';

const initialState = {
    cat_id :[],
    sub_cat_List: [],
    update_sub_cat: []
}

function subCatagoriesReducer(state = initialState, action) {

    switch (action.type) {

        // save id of catagory(based on that view sub catagory)
        case GET_ID_VIEW_CATAGORY: {
            return {
                ...state,
                cat_id: action.payload
            }
        }

        //view sub catagory data
        case VIEW_SUB_CATAGORY_DATA: {
            return {
                ...state,
                sub_cat_List: action.payload
            }
        }

        //update sub catagory data
        case UPDATE_SUB_CATAGORIES_DATA: {
            return {
                ...state,
                update_sub_cat: action.payload
            }
        }

        //delete sub catagory data
        case DELETE_SUB_CATAGORY_DATA: {
            const data = state.sub_cat_List.filter(o => !action.payload.id.includes(o.sub_catagory_id))
            return {
                ...state,
                sub_cat_List: data
            }
        }

        default:
            return state
    }

}

export default subCatagoriesReducer