const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')
const _ = require("lodash")
//add item in cart if there is noo cart id
exports.addItemInCart = async (req, res, next) => {
    const { c_product_id,
        number_of_product,
        c_user_id,
        size_id,
        color_id
    } = req.body

    const sql = `INSERT into cart(c_user_id ) VALUES ('${c_user_id}') RETURNING cart_id`

    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }

        const sql1 = `INSERT into cart_data(c_product_id , number_of_product , c_cart_id ,c_size_id ,c_color_id) VALUES ('${c_product_id}','${number_of_product}' , '${data.rows[0].cart_id}' , '${size_id}' ,'${color_id}') RETURNING cart_data_id`
        conn.query(sql1, function (err, data1, feilds) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                res.send({
                    data: { cart_id: data.rows[0].cart_id, cart_data_id: data1.rows[0].cart_data_id },
                    message: `cart data ${data.rows[0].cart_id} added to the database`
                })
            }
        })
    })
}

//add item in cart if there exist cart id
exports.addItemInCartIfExistCartId = async (req, res, next) => {
    const { c_product_id,
        number_of_product,
        cart_id,
        size_id,
        color_id } = req.body

    const sql1 = `INSERT into cart_data(c_product_id , number_of_product , c_cart_id ,c_size_id ,c_color_id) VALUES ('${c_product_id}','${number_of_product}' , '${cart_id}' , '${size_id}' ,'${color_id}') RETURNING cart_data_id`
    conn.query(sql1, function (err, data1, feilds) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        else {
            res.send({
                msg: data1.rows[0].cart_data_id,
                message: `cart data ${cart_id} added to the database`
            })
        }
    })
}

//check weather cart data exist or not
function getPromise(req, res, next) {
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
        const sql = `SELECT * from cart WHERE c_user_id = ${decoded.user_id}`
        conn.query(sql, async function (err, rows, feild) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                _.isEmpty(rows.rows) ?
                    resolve(0) :
                    resolve(rows.rows[0])
            }
        })
    });
}

//get cartData
function getPromise1(cart_id_exist, req, res, next) {
    return new Promise(async (resolve, reject) => {
        const { c_product_id,
            number_of_product,
            c_user_id,
            size_id,
            color_id
        } = req.body

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

        if (cart_id_exist === 0) {
            const sql = `INSERT into cart(c_user_id ) VALUES ('${decoded.user_id}') RETURNING cart_id`

            conn.query(sql, function (err, data, feilds) {
                if (err) {
                    res.send({
                        success: false,
                        err: err.message
                    })
                }

                const sql1 = `INSERT into cart_data(c_product_id , number_of_product , c_cart_id ,c_size_id ,c_color_id) VALUES ('${c_product_id}','${number_of_product}' , '${data.rows[0].cart_id}' , '${size_id}' ,'${color_id}') RETURNING cart_data_id`
                conn.query(sql1, function (err, data1, feilds) {
                    if (err) {
                        res.send({
                            success: false,
                            err: err.message
                        })
                    }
                    else {
                        resolve(
                            { cart_id: data.rows[0].cart_id, cart_data_id: data1.rows[0].cart_data_id }
                        )
                    }
                })
            })
        }
        else {
            var sql = `SELECT * from cart WHERE c_user_id = ${decoded.user_id}`
            var sql1
            conn.query(sql, function (err, data, fields) {
                if (err) throw err;
                sql1 = `INSERT into cart_data(c_product_id , number_of_product , c_cart_id ,c_size_id ,c_color_id) VALUES ('${c_product_id}','${number_of_product}' , '${data.rows[0].cart_id}'  ,'${size_id}' ,'${color_id}') RETURNING cart_data_id`
                conn.query(sql1, function (err, data1, fields) {
                    if (err) throw err;
                    resolve({
                        error: false,
                        msg: {
                            cart_data_id: data1.rows[0].cart_data_id,
                            cart_id: data.rows[0].cart_id
                        },
                        message: 'data updated'
                    })
                })
            });
        }
    });
}


// async function to make http request
async function makeSynchronousRequest(req, res, next) {
    try {
        let http_promise = getPromise(req, res, next);
        let cart_id_exist = await http_promise;

        let http_promise1 = getPromise1(cart_id_exist, req, res, next);
        let get_cart_data = await http_promise1;

        return get_cart_data
    }
    catch (error) {
        console.log(error);
    }
}


exports.addItemInCartInCartIfUserLoggedin = async (req, res, next) => {
    const data = await makeSynchronousRequest(req, res, next);
    res.send(data)
}