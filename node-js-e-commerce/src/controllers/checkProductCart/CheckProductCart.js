const conn = require('../../app/models/dbConnection')
const jwt = require("jsonwebtoken")

function getPromise(req, res, next) {
    const { color_id, size_id } = req.query
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
        const sql = `SELECT * FROM cart_data WHERE c_cart_id IN(SELECT cart_id FROM cart Where c_user_id = '${decoded.user_id}')  AND c_color_id='${color_id}' AND c_size_id='${size_id}' ORDER BY cart_data_id `
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

function getPromise1(req, res, next) {
    const { cart_id, color_id, size_id } = req.query
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from cart_data where c_cart_id = '${cart_id}' AND c_color_id='${color_id}' AND c_size_id='${size_id}'`
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

async function makeSynchronousRequest(req, res, next) {
    try {
        let get_productdata;
        if (req.headers.authorization == "Bearer undefined") {
            let http_promise1 = getPromise1(req, res, next); //get cart data with cart id
            get_productdata = await http_promise1
        }
        else {
            let http_promise = getPromise(req, res, next); //get cart data with user id
            get_productdata = await http_promise;
        }
        return get_productdata
    }
    catch (error) {
        console.log(error);
    }
}

exports.checkProductInCart = async (req, res, next) => {
    const data = await makeSynchronousRequest(req, res, next);
    res.send({
        data: data
    })
}