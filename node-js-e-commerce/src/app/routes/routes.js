const router = require('express').Router();

const { registerUserController } = require('../../controllers/registration/registration') //registration rout
const { loginController } = require('../../controllers/login/login')//import login route

//catagory routes
const { addCatagories } = require('../../controllers/catagories/addCatagories')
const { updateCatagories } = require('../../controllers/catagories/updateCatagories')
const { deleteCatagories } = require('../../controllers/catagories/deleteCatagories')
const { viewCatagories } = require('../../controllers/catagories/viewCatagories')

//sub catagory routes
const { addSubCatagories } = require('../../controllers/subCatagories/addSubCatagories')
const { updateSubCatagories } = require('../../controllers/subCatagories/updateSubCatagories')
const { deleteSubCatagories } = require('../../controllers/subCatagories/deleteSubCatagories')
const { viewSubCatagories } = require('../../controllers/subCatagories/viewSubCatagories')

//products
const { addProducts } = require('../../controllers/product/addProducts')
const { updateProducts } = require('../../controllers/product/updateProducts')
const { deleteProducts } = require('../../controllers/product/deleteProducts')
const { viewProductWithId } = require('../../controllers/product/ViewProductId')
const { get_product_cart_data, get_product_cart_data_user_id } = require('../../controllers/product/ViewProductWithCart')
const { getTotalCount, viewProductNextPage, viewProductFirstPage } = require('../../controllers/product/viewProducts')

// Home page user
const { topCatagoriesFirstPage } = require('../../controllers/HomePageUser/topCatagories')

//user list
const { viewUsersList } = require('../../controllers/users/viewUsers')
const { UserDataAfterAuth } = require('../../controllers/users/UserDataAfterAuth')

//cart operation
const { addItemInCart, addItemInCartIfExistCartId, addItemInCartInCartIfUserLoggedin } = require('../../controllers/cart/AddItemCart')
const { updateNumberOfProductInCart } = require('../../controllers/cart/UpdateCart')
const { viewCartData, cartDataCount, viewCartDataUserLoggedIn } = require('../../controllers/cart/viewCartData')
const { updateUserIdCart } = require('../../controllers/cart/getCartIdToken')
const { cartDataCountUserId } = require('../../controllers/cart/viewCartUserId')

//account
const { userDetails } = require('../../controllers/account/userDetails')

//address
const { addAddressDetails } = require('../../controllers/address/addUserAddress')
const { userAddressDetails, userAddressDetailsDefault } = require('../../controllers/address/viewAddressDetails')
const { updateAddressDetails } = require('../../controllers/address/updateAddress')
const { deleteAddressDetails } = require('../../controllers/address/deleteAddress')
const { updatedefaultAddressDetails } = require("../../controllers/address/updateDefaultAddress")

//orders
const { userOrderDetails } = require('../../controllers/orders/orederDetails')
const { addUserOrders } = require('../../controllers/orders/addOrders')
const { userOrderDetailsWithID } = require('../../controllers/orders/OrderDetailsId')
const { cencleOrder } = require('../../controllers/orders/CencleOrder')

//view all sub catagory
const { getAllSubCatagory } = require('../../controllers/AllSubCatagories/AllSubCatagories')
const { checkProductInCart } = require('../../controllers/checkProductCart/CheckProductCart')
const { getTotalCountEveryProduct, viewEveryProductFirstPage } = require('../../controllers/everyProduct/everyProduct')

//sum of cart
const { getSumOfCartUserLoggedIn } = require('../../controllers/sumOfCart/SumOfCart')

//payment
const { userPaymentWithRazorpay } = require('../../controllers/payment/payment')

//view all orders
const { viewAllOrdersList } = require("../../controllers/ViewAllOrder/VIewAllOrders")

router.post('/register-user', registerUserController)
router.post('/login-user', loginController)

//catagories
router.post('/add-catagories', addCatagories)
router.put('/update-catagories/:id', updateCatagories)
router.delete('/delete-catagories/:id', deleteCatagories)
router.get('/view-catagories', viewCatagories)

//sub-catagories
router.post('/add-sub-catagories', addSubCatagories)
router.put('/update-sub-catagories/:id', updateSubCatagories)
router.delete('/delete-sub-catagories/:id', deleteSubCatagories)
router.get('/view-sub-catagories', viewSubCatagories)

//products
router.post('/add-products', addProducts)
router.put('/update-products', updateProducts)
router.delete('/delete-products/:id', deleteProducts)
router.get('/view-products', viewProductFirstPage)
router.get('/view-products-pages', viewProductNextPage)
router.get('/get-total-count', getTotalCount)
router.get("/view-product-with-id", viewProductWithId)
router.get('/get-product-cart-data', get_product_cart_data) //not in use
router.get('/get-product-cart-data-user-id', get_product_cart_data_user_id) //not in use

//view available users
router.get('/get-users', viewUsersList)//
router.get('/user-data-after-auth', UserDataAfterAuth)//

//home page user side
router.get('/get-top-deals', topCatagoriesFirstPage)//

//cart operation
router.post('/add-item-in-cart', addItemInCart)
router.post('/add-item-cart-exist-cart-id', addItemInCartIfExistCartId)
router.post('/add-item-cart-if-user-loggedin', addItemInCartInCartIfUserLoggedin)
router.put('/update-number-of-product-cart', updateNumberOfProductInCart)
router.get('/view-cart-data', viewCartData)//not in use
router.get('/get-count-cart', cartDataCount)
router.get('/view-cart-data-user-logged-in', viewCartDataUserLoggedIn)

//user id
router.put('/update-user-id', updateUserIdCart)//
router.get("/get-count-cart-user-id", cartDataCountUserId)//

//account
router.get('/user-details', userDetails)//

//address 
router.get("/user-address-details-default", userAddressDetailsDefault)
router.post('/add-address-details', addAddressDetails)
router.get('/user-address-details', userAddressDetails)
router.put('/update-user-address', updateAddressDetails)
router.delete('/delete-user-address/:id', deleteAddressDetails)
router.put('/update-default-address-details', updatedefaultAddressDetails)

//orders
router.get('/user-order-deetails', userOrderDetails)
router.post('/add-user-order', addUserOrders)
router.get('/user-order-deetails-with-id', userOrderDetailsWithID)
router.put("/cencle-orders/:id", cencleOrder)

//view products without sub catagory id
router.get('/view-every-products', viewEveryProductFirstPage)
router.get('/get-total-count-every-product', getTotalCountEveryProduct)

//view all sub catagpry
router.get('/get-all-sub-catagory', getAllSubCatagory)//

//check product in cart
router.get('/check-product-cart', checkProductInCart)

//sumOfCart
router.get('/get-sum-of-cart-user-loggedin', getSumOfCartUserLoggedIn)

//payment
router.post('/payment', userPaymentWithRazorpay) //

//view all orders at admin side
router.get("/view-all-orders-at-admin",viewAllOrdersList)

module.exports = router;
