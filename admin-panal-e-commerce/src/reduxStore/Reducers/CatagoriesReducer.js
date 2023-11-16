import {
    VIEW_CATAGORIES_DATA,
    UPDATE_CATAGORIES_DATA,
    DELETE_CATAGORY_DATA
} from '../Actions/ActionTypes';

const initialState = {
    cat_List: [],
    update_cat: []
}

function CatagoriesReducer(state = initialState, action) {

    switch (action.type) {
        //view catagory data
        case VIEW_CATAGORIES_DATA: {
            return {
                ...state,
                cat_List: action.payload.cat_List
            }
        }

        //update catagory data
        case UPDATE_CATAGORIES_DATA: {
            return {
                ...state,
                update_cat: action.payload
            }
        }

        //delete catagory data
        case DELETE_CATAGORY_DATA: {
            const data = state.cat_List.filter(o => !action.payload.id.includes(o.catagory_id))
            return {
                ...state,
                cat_List: data
            }
        }

        default:
            return state
    }

}

export default CatagoriesReducer