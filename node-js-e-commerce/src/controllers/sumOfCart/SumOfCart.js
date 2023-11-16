const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
// if user logged in 
//get cart data
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
        const sql = `SELECT * FROM cart_data WHERE c_cart_id IN(SELECT cart_id FROM cart Where c_user_id = '${decoded.user_id}') ORDER BY cart_data_id `
        conn.query(sql, async function (err, rows, feild) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                resolve(rows.rows)
            }
        })
    });
}

//get cart data if user not logged in
function getPromise4(req, res, next) {
    const {cart_id} = req.query
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM cart_data WHERE c_cart_id IN(SELECT cart_id FROM cart Where cart_id = '${cart_id}') ORDER BY cart_data_id `
        conn.query(sql, async function (err, rows, feild) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                resolve(rows.rows)
            }
        })
    });
}

//get productdata
function getPromise1(get_productdata, req, res, next) {
    return new Promise(async (resolve, reject) => {
        let product = []
        const sql1 = `SELECT price,product_id,discount from products WHERE product_id =$1`
        for (var j = 0; j < get_productdata.length; j++) {
            tVal = get_productdata[j];//some manipulation of someArr[j
            (async function (val) {
                await conn.query(sql1, [val.c_product_id], function (err, rows, fields) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        product.push(rows.rows[0]);//push query output to this variable 
                        if (get_productdata.length === product.length) {
                            resolve(product)
                        }
                    }
                });
            })(tVal);
        }
    });
}

//get final array
function getPromise2(get_productdata, get_product_cart_data_user_id) {
    return new Promise(async (resolve, reject) => {
        const finalArray = get_productdata
            .map(d => {
                return {
                    ...d,
                    product: get_product_cart_data_user_id.filter(data => data.product_id === d.c_product_id),
                }
            })

        resolve(finalArray)
    })
}

//get sum
function getPromise3(finalArray) {
    return new Promise(async (resolve, reject) => {
        let sum = 0
        finalArray.map((data) => {
            return (
                data.product.map((pro) => {
                    return (
                        sum =(sum + (Math.ceil(pro.price - (pro.price * pro.discount / 100)) * data.number_of_product))
                    )
                })
            )
        })
        resolve(sum)
    })
}

//get data with price and number of product
// function getPromise4(get_productdata, get_product_cart_data_user_id) {
//     return new Promise(async (resolve, reject) => {
//         const sql = 
//         // var newArray = [];
//         // get_productdata.forEach(item => {
//         //     var newItem = [];
//         //     get_product_cart_data_user_id.forEach(innerItem => {
//         //         if (innerItem.product_id == item.c_product_id) {
//         //             newItem = newItem.concat(innerItem, item);
//         //         }
//         //     });
//         //     newArray.push(newItem);
//         // });

//     })
// }

// async function to make http request

async function makeSynchronousRequest(req, res, next) {
    try {

        let get_productdata;

       
        if (req.headers.authorization == "Bearer null") {
            let http_promise4 = getPromise4(req, res, next); //get cart data with cart id
            get_productdata = await http_promise4;
        }
        else {
            let http_promise = getPromise(req, res, next); //get cart data with user id
             get_productdata = await http_promise;
        }


        //get product data
        let http_promise1 = getPromise1(get_productdata, req, res, next);
        let get_product_cart_data_user_id = await http_promise1;

        get_product_cart_data_user_id = await get_product_cart_data_user_id.reduce((acc, current) => {
            const x = acc.find(item => item.product_id === current.product_id);
            if (!x) {
                return [...acc, current];
            } else {
                return acc.map(x => x.product_id === current.product_id ? ({ ...x }) : x)
            }
        }, [])

        //get final array
        let http_promise2 = getPromise2(get_productdata, get_product_cart_data_user_id);
        let finalArray = await http_promise2;
        let http_promise3 = getPromise3(finalArray);
        let get_sum = await http_promise3;

        return { get_sum, get_productdata }
    }
    catch (error) {
        console.log(error);
    }
}


exports.getSumOfCartUserLoggedIn = async (req, res, next) => {
    const data = await makeSynchronousRequest(req, res, next);
    res.send({
        data: data
    })
}