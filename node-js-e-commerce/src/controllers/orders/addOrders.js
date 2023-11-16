const conn = require('../../app/models/dbConnection')
const jwt = require("jsonwebtoken")

//Delete Data from cart
//get cart data
function getPromise(req, res, next) {
    const { product_data } = req.body
    let cart_id = []
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

        const sql = `DELETE from cart_data WHERE cart_data_id = $1 RETURNING cart_data_id`
        product_data.forEach(element => {
            conn.query(sql, [element.cart_data_id], async function (err, rows, feild) {
                if (err) {
                    res.send({
                        success: false,
                        err: err.message
                    })
                }
                else {
                    cart_id.push(rows.rows[0]);//push query output to this variable 
                    if (product_data.length === cart_id.length) {
                        resolve(cart_id)
                    }
                }
            })
        });
    });
}

function getPromise1(req, res, next) {
    const {
        price,
        rp_transactionid,
        razorpay_order_id,
        created_at,
        address_id
    } = req.body

    return new Promise((resolve, reject) => {
        try {
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

            const sql = `INSERT into orders(o_user_id ,order_flag ,price ,rp_transactionid,razorpay_order_id,created_at,o_address_id ) VALUES ('${decoded.user_id}','${true}','${price}','${rp_transactionid}','${razorpay_order_id}' ,'${created_at}','${address_id}') RETURNING order_id`
            conn.query(sql, function (err, data, feilds) {
                if (err) {
                    res.send({
                        success: false,
                        err: err.message
                    })
                }
                else {
                    resolve(data.rows[0].order_id)
                }
            })
        }
        catch (err) {
            next(err);
        }
    });
}

function getPromise2(req, res, next) {
    const {
        product_data
    } = req.body
    const order_data = []
    return new Promise((resolve, reject) => {
        const sql1 = `SELECT product_id,final_price from products WHERE product_id = $1`
        product_data.forEach(function (element, index) {
            const value = [element.c_product_id]
            conn.query(sql1, value, function (err, data1, feilds) {
                if (err) throw err;
                order_data.push((data1.rows[0]));//push query output to this variable 
                if (product_data.length === order_data.length) {
                    resolve(order_data)
                }
            })
        })
    });
}

//add orders in data base
function getPromise3(order_data, req, res, next, add_orders) {
    const {
        product_data
    } = req.body
    const order_data1 = []

    return new Promise((resolve, reject) => {
        const finalArray = product_data.map(t1 => ({ ...t1, ...order_data.find(t2 => t2.product_id == t1.c_product_id) }))

        const sql1 = `INSERT into order_data(o_product_id  ,o_no_of_product ,o_c_color_id ,o_c_size_id , product_price ,o_order_id ) VALUES ($1,$2 ,$3 ,$4 ,$5 ,'${add_orders}' ) RETURNING order_data_id`
       
        finalArray.forEach(function (element, index) {
                const value = [element.c_product_id, element.number_of_product, element.c_color_id, element.c_size_id, element.final_price ]
                conn.query(sql1, value, function (err, data1, feilds) {
                    if (err) throw err;
                    order_data1.push(data1.rows[0]);//push query output to this variable 
                    if (product_data.length === order_data1.length) {

                        resolve(order_data1)
                    }                 
                })
            })
    });
}

// async function to make http request
async function makeSynchronousRequest(req, res, next) {
    try {
        let http_promise = getPromise(req, res, next);
        await http_promise;

        let http_promise1 = getPromise1(req, res, next);
        let add_orders = await http_promise1;

        //get price of product from database
        let http_promise2 = getPromise2(req, res, next);
        let order_data = await http_promise2;

        //add products into a database
        let http_promise3 = getPromise3(order_data, req, res, next ,add_orders);
        let add_order_data = await http_promise3;
    }
    catch (error) {
        console.log(error);
    }
}

exports.addUserOrders = async (req, res, next) => {
    const data = await makeSynchronousRequest(req, res, next);
    res.send({
        success: true,
        msg: "data updated succesfully"
    })
}
