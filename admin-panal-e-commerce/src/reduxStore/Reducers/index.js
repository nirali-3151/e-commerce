
import { combineReducers } from 'redux'
import CatagoriesReducer from './CatagoriesReducer'
import ProductReducer from './ProductReducer'
import subCatagoriesReducer from './SubCatagoryReducer'

const reducer = combineReducers(
    {
        CatagoriesReducer: CatagoriesReducer,
        subCatagoriesReducer:subCatagoriesReducer,
        ProductReducer:ProductReducer
    }
)

export default reducer;