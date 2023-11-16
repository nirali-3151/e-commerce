import httpClient from "./httpClient";

import React, { Component } from 'react'

class UserService extends Component {

    //view order list
    static async viewOrdersList() {
        let result = []
        try {
            let api_name = "view-all-orders-at-admin"
            result = await httpClient.viewOrders(api_name)
        } catch (error) {
            console.log("view users", error);
        }
        return result
    }


    //view users list
    static async viewUsersList() {
        let result = []
        try {
            let api_name = "get-users"
            result = await httpClient.viewUsers(api_name)
        } catch (error) {
            console.log("view users", error);
        }
        return result
    }

    //view Catagories  list
    static async viewCatagoriesList() {
        let result = []
        try {
            let api_name = "view-catagories"
            result = await httpClient.viewCatagories(api_name)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }
    //Delete perticular catagory
    static async deleteCatagoryList(id) {
        let result = []
        try {
            let api_name = `delete-catagories/${id}`
            result = await httpClient.deleteCatagory(api_name, id)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }
    //add catagory list
    static async addCatagoryList(newData) {
        let result = []
        try {
            let api_name = "add-catagories"
            result = await httpClient.addCatagory(api_name, newData)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }

    //Update catagory list
    static async updateCatagoryList(id, newData) {
        let result = []
        try {
            let api_name = `update-catagories/${id}`
            result = await httpClient.updateCatagory(api_name, newData)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }

    //view sub catagory list
    static async viewSubCatagoryList(id) {
        let result = []
        try {
            let api_name = `view-sub-catagories?catagory_id=${id}`
            result = await httpClient.viewSubCatagory(api_name)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }
    //Add Sub Catagory list
    static async addSubCatagoryList(newData) {
        let result = []
        try {
            let api_name = "add-sub-catagories"
            result = await httpClient.addSubCatagory(api_name, newData)
        } catch (error) {
            console.log("view sub catagory", error);
        }
        return result
    }
    //update sub catagory list
    static async updateSubCatagoryList(id, newData) {
        let result = []
        try {
            let api_name = `update-sub-catagories/${id}`
            result = await httpClient.updateSubCatagory(api_name, newData)
        } catch (error) {
            console.log("update sub catagory", error);
        }
        return result
    }
    //delete sub catagory list
    static async deleteSubCatagoryList(id, newData) {
        let result = []
        try {
            let api_name = `delete-sub-catagories/${id}`
            result = await httpClient.deleteSubCatagory(api_name, newData)
        } catch (error) {
            console.log("update sub catagory", error);
        }
        return result
    }

    //get total number of product count
    static async getProductCountList() {
        let result = []
        try {
            let api_name = "get-total-count-every-product"
            result = await httpClient.getProductCount(api_name)
        } catch (error) {
            console.log("count error", error);
        }
        return result
    }
    
    //View every products List admin panal
    static async viewProductsList() {
        let result = []
        try {
            let api_name = "view-every-products"
            result = await httpClient.viewProducts(api_name)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }
    //Delete product list
    static async deleteProductList(id) {
        let result = []
        try {
            let api_name = `delete-products/${id}`
            result = await httpClient.deleteProduct(api_name, id)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }
    //add product list
    static async addProductList(newData) {
        let result = []
        try {
            let api_name = "add-products"
            result = await httpClient.addProduct(api_name, newData)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }
    
    //Update catagory list
    static async updateProductList(id, newData) {
        let result = []
        try {
            let api_name = `update-products?product_id=${id}`
            result = await httpClient.updateProduct(api_name, newData)
        } catch (error) {
            console.log("view Department", error);
        }
        return result
    }

    //view product with id
    static async ViewProductWithIdList(id) {
        let result = []
        try {
            let api_name = `view-product-with-id?product_id=${id}`
            result = await httpClient.ViewProductWithId(api_name, id)
        } catch (error) {
            console.log("get login user", error);
        }
        return result
    }

}

export default UserService