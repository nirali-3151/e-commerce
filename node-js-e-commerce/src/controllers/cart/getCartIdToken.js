const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')
const pgp = require('pg-promise')();
const _ = require('lodash')

//get cart id if there is authentication(update user id in cart) and  merge the data
function getPromise(req, res, next) {
    const { cart_id } = req.body
    return new Promise((resolve, reject) => {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        var sql = `UPDATE cart SET c_user_id =('${decoded.user_id}') WHERE cart_id = ${cart_id}`

        conn.query(sql, function (err, data, fields) {
            if (err) throw err;
            resolve({ error: false, message: 'data updated' })
            // res.send({ error: false, message: 'data updated' });
        })
    })
}

//check weather product with same id ,size and color already exist or not
function getPromise1(req, res, next) {
    return new Promise((resolve, reject) => {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
        var sql = `SELECT * FROM cart_data WHERE c_cart_id IN(SELECT cart_id FROM cart Where c_user_id = 1)`
        conn.query(sql, function (err, data, fields) {
            if (err) throw err;
            resolve(data.rows)
        })
    })
}

//remove data from database with same id 
function getPromise2(checkProductID, req, res, next) {
    let sum = 0
    let data = []
    let matchProductDataToUpdate = []
    return new Promise((resolve, reject) => {

        const data1 = checkProductID.map((value, index, self) =>
            self.filter((t) => (
                t.c_product_id === value.c_product_id && t.c_size_id === value.c_size_id && t.c_color_id === value.c_color_id ? sum += t.number_of_product : ""
            ))
        )


        data = data1.map((da) => {
            return (
                da.reduce((a, b) => {
                    return {
                        ...da[0],
                        cart_data_id: parseInt(a.cart_data_id),
                        number_of_product: JSON.stringify(parseInt(a.number_of_product) + parseInt(b.number_of_product))
                    }
                }
                )
            )
        })
        
        let uniqueList = [];

        Array.prototype.contains = function (item) {
            let filtered_item = this.filter((i) => {
                return i.c_product_id === item.c_product_id && i.c_color_id === item.c_color_id && i.c_size_id === item.c_size_id
            });
            return !!filtered_item.length;
        }

        function pushToUniqueList(item) {
            if (!uniqueList.contains(item)) uniqueList.push(item);
        }

        function pushToDuplicateList(item) {
            if (!matchProductDataToUpdate.contains(item)) matchProductDataToUpdate.push(item);
        }

        for (let i = 0; i < data.length; i++) {
            if (uniqueList.contains(data[i])) {
                pushToDuplicateList(data[i]);
            } else {
                pushToUniqueList(data[i]);
            }
        }

        const data_to_delete = checkProductID.filter(val => !uniqueList.some(uni => val.cart_data_id == uni.cart_data_id));

        resolve({
            data_to_delete: data_to_delete,
            matchProductDataToUpdate: matchProductDataToUpdate
        })

    })
}

//update cart data
function getPromise3(getDataSameId, req, res, next) {
    const update_data = getDataSameId.matchProductDataToUpdate
    return new Promise(async(resolve, reject) => {
        if (_.isEmpty(update_data)) {
            resolve({
                success: true,
                message: "There is no data to update"
            })
        }
        else {
            const setTable = new pgp.helpers.ColumnSet(['?cart_data_id' ,'number_of_product'], { table: 'cart_data' });
            const insertOnConflict = pgp.helpers.update(update_data, setTable) + ' WHERE  v.cart_data_id = t.cart_data_id'
            const result = await conn.query(insertOnConflict);
            resolve({
                success: true,
                message: "data is updated"
            })
        }

    })
}


//delete cart data
function getPromise4(getDataSameId, req, res, next) {
    const delete_data = getDataSameId.data_to_delete
    return new Promise(async (resolve, reject) => {
        if (_.isEmpty(delete_data)) {
            resolve({
                success: true,
                message: "There is no data to delete"
            })
        }
        else {
            const sql1 = `DELETE from cart_data WHERE cart_data_id = $1 RETURNING *`
            delete_data.forEach(element => {
                conn.query(sql1, [element.cart_data_id], async function (err, rows1, feild) {
                    if (err) {
                        res.send({
                            success: false,
                            err: err.message
                        })
                    }
                    else {
                        resolve({
                            success: true,
                            message: "data is deleted"
                        })
                    }
                })
            });
        }
    })
}

async function makeSynchronousRequest(req, res, next) {
    try {

        //update user id
        let http_promise = getPromise(req, res, next);
        const update_cart_id = await http_promise

        //check weather product with same id ,size and color already exist or not
        let http_promise1 = getPromise1(req, res, next);
        const checkProductID = await http_promise1

        //remove data from database with same id 
        let http_promise2 = getPromise2(checkProductID, req, res, next);
        const getDataSameId = await http_promise2

        //update data
        let http_promise3 = getPromise3(getDataSameId, req, res, next);
        const update_cart_data = await http_promise3

        //delete data
        let http_promise4 = getPromise4(getDataSameId, req, res, next);
        const delete_cart_data = await http_promise4

        // console.log("update_cart_id" ,update_cart_id);
        // console.log("checkProductID" ,checkProductID);
        // console.log("getDataSameId" ,getDataSameId);
        // console.log("update_cart_data" ,update_cart_data);
        // console.log("delete_cart_data",delete_cart_data);
    }
    catch (error) {
        console.log(error);
    }
}


exports.updateUserIdCart = async (req, res, next) => {
    const data = await makeSynchronousRequest(req, res, next);
    res.send({
        success:true
    })

}



