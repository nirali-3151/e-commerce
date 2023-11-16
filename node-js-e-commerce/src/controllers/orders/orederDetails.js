const conn = require('../../app/models/dbConnection')
const jwt = require("jsonwebtoken")
// getOrderID 
function getOrderID(req, res, next) {
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
        const sql = `SELECT * FROM orders WHERE o_user_id = ${decoded.user_id} ORDER BY order_id DESC`
        conn.query(sql, async function (err, rows, feild) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                resolve(rows.rows)//push query output to this variable 
            }
        })
    });
}

// async function to make http request

// get order data 
function getOrder_Data_ID(req, res, next, order_id) {
    const getOrderDataID = []
    const getOrderDataIDMain = []

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM order_data WHERE o_order_id = $1`
        order_id.forEach(element => {
            conn.query(sql, [element.order_id], async function (err, rows, feild) {
                if (err) throw err
                else {
                    getOrderDataID.push(rows.rows)
                    if (order_id.length === getOrderDataID.length) {
                        getOrderDataID.forEach((e) => {
                            e.forEach((ele) => {
                                getOrderDataIDMain.push(ele)
                            })
                        })
                        resolve(getOrderDataIDMain)
                    }
                }
            })
        });
    });
}

//get product details
function get_product_details(req, res, next, order_data_id) {
    const product_Data = []
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM products WHERE product_id = $1`
        order_data_id.forEach(element => {
            conn.query(sql, [element.o_product_id], async function (err, rows, feild) {
                if (err) throw err
                product_Data.push(rows.rows[0])
                if (product_Data.length === order_data_id.length) {
                    resolve(product_Data)
                }
            })
        })
    });
}

//get image details
function get_images_details(req, res, next, order_data_id) {
    const product_Data = []
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from product_image where p_product_id  = $1`
        order_data_id.forEach(element => {
            conn.query(sql, [element.o_product_id], async function (err, rows, feild) {
                if (err) throw err
                product_Data.push(rows.rows[0])
                if (product_Data.length === order_data_id.length) {
                    resolve(product_Data)
                }
            })
        })
    });
}

//get color details
function get_colors_details(req, res, next, order_data_id) {
    const product_Data = []
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from colors where color_id = $1`
        order_data_id.forEach(element => {
            conn.query(sql, [element.o_c_color_id], async function (err, rows, feild) {
                if (err) throw err
                product_Data.push(rows.rows[0])
                if (product_Data.length === order_data_id.length) {
                    product_Data.forEach(function (element, index) {
                        if (typeof (element) == "undefined") {
                            product_Data[index] = {};
                        }
                    });
                    resolve(product_Data)
                }
            })
        })
    });
}


//get size data
function get_size_details(req, res, next, order_data_id) {
    const product_Data = []
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from sizes where size_id = $1`
        order_data_id.forEach(element => {
            conn.query(sql, [element.o_c_size_id], async function (err, rows, feild) {
                if (err) throw err
                product_Data.push(rows.rows[0])
                if (product_Data.length === order_data_id.length) {
                    product_Data.forEach(function (element, index) {
                        if (typeof (element) == "undefined") {
                            product_Data[index] = {};
                        }
                    });
                    resolve(product_Data)
                }
            })
        })
    });
}



async function makeSynchronousRequest(req, res, next) {
    try {
        //get order id
        let http_promise = getOrderID(req, res, next);
        let order_id = await http_promise;

        //get order_data id
        let http_promise1 = getOrder_Data_ID(req, res, next, order_id);
        let order_data_id = await http_promise1;

        // get product details :
        let http_promise2 = get_product_details(req, res, next, order_data_id);
        let product_details = await http_promise2;

        //get images
        let http_promise3 = get_images_details(req, res, next, order_data_id);
        let images_details = await http_promise3;

        //get colors
        let http_promise4 = get_colors_details(req, res, next, order_data_id);
        let colors_details = await http_promise4;

        //get sizes 
        let http_promise5 = get_size_details(req, res, next, order_data_id);
        let size_details = await http_promise5;

        product_details = await product_details.reduce((acc, current) => {
            const x = acc.find(item => item.product_id === current.product_id);
            if (!x) {
                return [...acc, current];
            } else {
                return acc.map(x => x.product_id === current.product_id ? ({ ...x }) : x)
            }
        }, [])

        const finalArray = order_id
            .map(d => {
                return {
                    ...d,
                    order: order_data_id.filter(da => da.o_order_id === d.order_id).map(
                        da => {
                            return {
                                ...da,
                                product_details: product_details.filter(data => data.product_id === da.o_product_id).map(
                                    pro => {
                                        return {
                                            ...pro,
                                            image: images_details.filter(({ p_product_id }) => pro.product_id === p_product_id),
                                            color: colors_details.filter(({ color_id }) => da.o_c_color_id === color_id),
                                            size: size_details.filter(({ size_id }) => size_id === da.o_c_size_id),
                                        }
                                    }
                                ),
                            }
                        }
                    ),
                }
            })
        // 
        return finalArray
    }
    catch (error) {
        console.log(error);
    }
}

exports.userOrderDetails = async (req, res, next) => {

    const data = await makeSynchronousRequest(req, res, next);
    res.send({
        finalArray: data
    })
}
