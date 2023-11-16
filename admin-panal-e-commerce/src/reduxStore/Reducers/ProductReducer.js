import {
    VIEW_PRODUCT_DATA_FP,
    UPDATE_PRODUCT_DATA,
    DELETE_PRODUCT,
    VIEW_PRODUCT_DATA_ID
} from '../Actions/ActionTypes';

const initialState = {
    product_List: [],
    update_product: [],
    product_id :[]
}

function ProductReducer(state = initialState, action) {

    switch (action.type) {
        //view product data
        case VIEW_PRODUCT_DATA_FP: {
            return {
                ...state,
                product_List: action.payload
            }
        }

        //update product data
        case UPDATE_PRODUCT_DATA: {
            return {
                ...state,
                update_product: action.payload
            }
        }

        //delete product data
        case DELETE_PRODUCT: {
            const data = state.product_List.filter(o => !action.payload.id.includes(o.product_id))
            return {
                ...state,
                product_List: data
            }
        }

        //view product with id
        case VIEW_PRODUCT_DATA_ID: {
            return {
                ...state,
                product_id: action.payload
            }
        }

        default:
            return state
    }

}

export default ProductReducer