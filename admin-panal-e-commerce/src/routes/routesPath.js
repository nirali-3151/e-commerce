// const location = useLocation()
// const searchParams = new URLSearchParams(location.search);

// const id = searchParams.get("p_sub_catagory_id")

//catagory
module.exports = {
    //catagory
    viewCatagory: "/view-catagories",
    AddCatagory:"/view-catagories/Add-catagories",
    UpdateCatagory:"/view-catagories/update-catagories",

    //sub catagory
    viewSubCatagory : "/view-catagories/view-sub-catagory",
    addSubCatagory: "/view-catagories/view-sub-catagory/add-sub-catagory",
    updateSubCatagory :"/view-catagories/view-sub-catagory/update-sub-catagory",

    //products
    viewProduct:'/view-products',
    viewProductIds :'/view-products-with-id',
    addProduct:'/view-products/add-products',
    updateProduct:'/view-products-with-id/update-products',

    //orders
    viewOrders:'/view-orders',

    //users
    users :"/view-users"
}