//authentication
const registration = require('./Authentication/Registration')
const login = require('./Authentication/Login')

//catagory
const addCatagory = require('./Catagories/AddCatagory')
const updateCatagory = require("./Catagories/UpdateCatagory")
const deleteCatagory = require('./Catagories/DeleteCatagory')
const viewCatagory = require('./Catagories/ViewCatagory')

//sub-catagory
const addSubCatagory = require('./SubCatagories/AddSubCatagory')
const updateSubCatagory = require("./SubCatagories/UpdateSubCatagory")
const deleteSubCatagory = require('./SubCatagories/DeleteSubCatagory')
const viewSubCatagory = require('./SubCatagories/ViewSubCatagory')

//address
const viewAddress = require('./Address/ViewAdd')
const viewDefaultAdd = require('./Address/ViewDefaultAdd')
const addAddress = require('./Address/AddAddress')
const updateAdd = require('./Address/UpdateAdd')
const updateDefaultAdd = require('./Address/UpdateDefaultAdd')
const deleteAdd = require('./Address/DeleteAdd')

//orders
const AllOrder = require('./Order/AllOrder')
const OrderWithId = require('./Order/OrderWithId')
const AddOrder = require('./Order/AddOrder')
const cencleOrder = require('./Order/CencleOrder')
const AllOrderAdmin = require('./Order/AllOrderAdmin')

//Products
const productCount = require('./Products/ProductCount')
const productDataFirstPage = require('./Products/ViewProduct')
const productDataPagination = require('./Products/ViewProductPagination')
const productWithId = require('./Products/ViewProductId')
const addProduct = require('./Products/addProduct')
const updateProduct = require('./Products/updateProduct')
const deleteProduct = require('./Products/DeleteProduct')
//use at admin side
const viewEveryProduct = require('./Products/ViewEveryProduct')
const getEveryproductCount = require('./Products/getCountEveryProduct')

//cart
const getCartCount = require('./cart/cartCount')
const AddItemCart = require('./cart/AddItemCart')
const AddItemExistCartId = require('./cart/AddItemExistCartId')
const AddItemCartUserLoggedin = require('./cart/AddItemCartUserLogin')
const CheckProductCart = require('./cart/CheckPoductCart')
const sumOfCartData = require('./cart/SumOfCartData')
const updateNumberOfProduct = require('./cart/UpdateNumberOfCart')
const viewCartData = require('./cart/ViewCart')
module.exports = {

    paths: {

        //auhtentication
        '/register-user': {
            ...registration
        },
        '/login-user': {
            ...login
        },

        //catagories
        '/view-catagories': {
            ...viewCatagory
        },
        '/add-catagories': {
            ...addCatagory
        },
        '/update-catagories/{id}': {
            ...updateCatagory
        },
        '/delete-catagories/{id}': {
            ...deleteCatagory
        },

        //sub catagories
        '/view-sub-catagories': {
            ...viewSubCatagory
        },
        '/add-sub-catagories': {
            ...addSubCatagory
        },
        '/update-sub-catagories/{id}': {
            ...updateSubCatagory
        },
        '/delete-sub-catagories/{id}': {
            ...deleteSubCatagory
        },

        //address
        '/user-address-details': {
            ...viewAddress
        },
        '/user-address-details-default': {
            ...viewDefaultAdd
        },
        '/add-address-details': {
            ...addAddress
        },
        '/update-user-address': {
            ...updateAdd
        },
        '/update-default-address-details': {
            ...updateDefaultAdd
        },
        '/delete-user-address/{id}': {
            ...deleteAdd
        },

        //Orders
        '/user-order-deetails': {
            ...AllOrder
        },
        '/user-order-deetails-with-id': {
            ...OrderWithId
        },
        '/view-all-orders-at-admin': {
            ...AllOrderAdmin
        },
        '/add-user-order': {
            ...AddOrder
        },
        '/cencle-orders/{id}': {
            ...cencleOrder
        },

        //products
        '/get-total-count': {
            ...productCount
        },
        '/view-products': {
            ...productDataFirstPage
        },
        '/view-products-pages': {
            ...productDataPagination
        },
        '/view-product-with-id': {
            ...productWithId
        },
        '/add-products': {
            ...addProduct
        },
        '/update-products': {
            ...updateProduct
        },
        '/delete-products/{id}': {
            ...deleteProduct
        },
        '/view-every-products': {
            ...viewEveryProduct
        },
        '/get-total-count-every-product': {
            ...getEveryproductCount
        },

        //cart
        '/get-count-cart': {
            ...getCartCount
        },
        '/view-cart-data': {
            ...viewCartData
        },
        '/get-sum-of-cart-user-loggedin': {
            ...sumOfCartData
        },
        '/check-product-cart': {
            ...CheckProductCart
        },
        '/add-item-in-cart': {
            ...AddItemCart
        },
        '/add-item-cart-exist-cart-id': {
            ...AddItemExistCartId
        },
        '/add-item-cart-if-user-loggedin': {
            ...AddItemCartUserLoggedin
        },
        '/update-number-of-product-cart': {
            ...updateNumberOfProduct
        },
    }
}