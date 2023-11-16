const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')

//get total number of cart data count
exports.cartDataCount = (req, res, next) => {
    const { cart_id } = req.query
    const sql = `SELECT count(*) FROM cart_data WHERE c_cart_id = '${cart_id}'`
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: "false",
                error: err
            })
        }
        res.send({
            data: data.rows,
            message: "count of cart data"
        })
    })
}

//currently not in use
exports.viewCartData = (req, res, next) => {
    const { cart_id } = req.query

    let finalArray = [];
    let product = [];
    let size = [];
    let color = [];
    let image = [];

    const sql = `SELECT * FROM cart_data WHERE c_cart_id = '${cart_id}'`
    const sql1 = `SELECT * from products WHERE product_id = $1 ORDER BY product_id`
    const sql2 = `SELECT * from sizes where s_product_id = $1 ORDER BY s_product_id`
    const sql3 = `SELECT * from colors where c_product_id = $1 ORDER BY c_product_id `;
    const sql4 = `SELECT * from product_image where p_product_id  = $1 ORDER BY p_product_id `

    conn.query(sql, function (err, rows, feild) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }

        rows.rows.forEach(function (element, index) {
            conn.query(sql1, [element.c_product_id], (err, rows1, feild) => {
                if (err) {
                    res.send({
                        success: false,
                        err: err.message
                    })
                }
                conn.query(sql2, [element.c_product_id], (err, rows2, feild) => {
                    if (err) {
                        res.send({
                            success: false,
                            err: err.message
                        })
                    }
                    conn.query(sql3, [element.c_product_id], (err, rows3, feild) => {
                        if (err) {
                            res.send({
                                success: false,
                                err: err.message
                            })
                        }
                        conn.query(sql4, [element.c_product_id], (err, rows4, feild) => {
                            if (err) {
                                res.send({
                                    success: false,
                                    err: err.message
                                })
                            }
                            else {
                                product = rows1.rows
                                size = rows2.rows
                                image = rows4.rows
                                color = rows3.rows

                                finalArray = rows.rows
                                    .map(d => {
                                        return {
                                            ...d,
                                            product: product.filter(data => data.product_id === d.c_product_id),
                                            size: size.filter(({ size_id }) => size_id === d.c_size_id),
                                            color: color.filter(({ color_id }) => d.c_color_id === color_id),
                                            image: image.filter(({ p_product_id }) => d.c_product_id === p_product_id),
                                        }
                                    })
                                if (index == rows.rows.length - 1) {
                                    res.json({ data: finalArray });
                                }
                            }
                        })
                    })
                })
            })
        })
    })
}

//if user logged in
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

//if user not loggedin
//get cart data
function getPromise5(req, res, next) {
    const {cart_id} = req.query
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM cart_data WHERE c_cart_id = '${cart_id}'`
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
        const sql1 = `SELECT * from products WHERE product_id =$1`
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

//get size data
function getPromise2(get_productdata, req, res, next) {
    return new Promise(async (resolve, reject) => {
        let size = []
        const sql1 = `SELECT * from sizes where size_id = $1 `
        for (var j = 0; j < get_productdata.length; j++) {
            tVal = get_productdata[j];//some manipulation of someArr[j
            (async function (val) {
                await conn.query(sql1, [val.c_size_id], function (err, rows, fields) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        size.push(rows.rows[0]);
                        if (get_productdata.length === size.length) {
                            const data = size.forEach(function (element, index) {
                                if (typeof (element) == "undefined") {
                                    size[index] = {};
                                }
                            });
                            resolve(size)
                        }
                    }
                });
            })(tVal);
        }
    });
}

//get color data
function getPromise3(get_productdata, req, res, next) {
    return new Promise(async (resolve, reject) => {
        let color = []
        const sql1 = `SELECT * from colors where color_id = $1   `
        for (var j = 0; j < get_productdata.length; j++) {
            tVal = get_productdata[j];//some manipulation of someArr[j
            (async function (val) {
                await conn.query(sql1, [val.c_color_id], function (err, rows, fields) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        color.push(rows.rows[0]);
                        if (get_productdata.length === color.length) {
                            const data = color.forEach(function (element, index) {
                                if (typeof (element) == "undefined") {
                                    color[index] = {};
                                }
                            });
                            resolve(color)
                        }
                    }
                });
            })(tVal);
        }
    });
}

//get image data
function getPromise4(get_productdata, req, res, next) {
    return new Promise(async (resolve, reject) => {
        let image = []
        const sql1 = `SELECT * from product_image where p_product_id  = $1`
        for (var j = 0; j < get_productdata.length; j++) {
            tVal = get_productdata[j];//some manipulation of someArr[j
            (async function (val) {
                await conn.query(sql1, [val.c_product_id], function (err, rows, fields) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        image.push(rows.rows[0]);
                        if (get_productdata.length === image.length) {
                            resolve(image)
                        }
                    }
                });
            })(tVal);
        }
    });
}

// async function to make http request
async function makeSynchronousRequest(req, res, next) {
    try {
        let get_productdata;

        if (req.headers.authorization == "Bearer null") {
            let http_promise5 = getPromise5(req, res, next); //get cart data with cart id
            get_productdata = await http_promise5;
        }
        else {
            let http_promise = getPromise(req, res, next);
             get_productdata = await http_promise;
        }

        let http_promise1 = getPromise1(get_productdata, req, res, next);
        let get_product_cart_data_user_id = await http_promise1;

        let http_promise2 = getPromise2(get_productdata, req, res, next);
        let get_size_data = await http_promise2;

        let http_promise3 = getPromise3(get_productdata, req, res, next);
        let get_color_data = await http_promise3;

        let http_promise4 = getPromise4(get_productdata, req, res, next);
        let get_image_data = await http_promise4;

        get_product_cart_data_user_id = await get_product_cart_data_user_id.reduce((acc, current) => {
            const x = acc.find(item => item.product_id === current.product_id);
            if (!x) {
                return [...acc, current];
            } else {
                return acc.map(x => x.product_id === current.product_id ? ({ ...x }) : x)
            }
        }, [])


        get_size_data = await get_size_data.reduce((acc, current) => {
            const x = acc.find(item => item.size_id === current.size_id);
            if (!x) {
                return [...acc, current];
            } else {
                return acc.map(x => x.size_id === current.size_id ? ({ ...x }) : x)
            }
        }, [])

        get_color_data = await get_color_data.reduce((acc, current) => {
            const x = acc.find(item => item.color_id === current.color_id);
            if (!x) {
                return [...acc, current];
            } else {
                return acc.map(x => x.color_id === current.color_id ? ({ ...x }) : x)
            }
        }, [])

        const finalArray = get_productdata
            .map(d => {
                return {
                    ...d,
                    product: get_product_cart_data_user_id.filter(data => data.product_id === d.c_product_id),
                    size: get_size_data.filter(({ size_id }) => size_id === d.c_size_id),
                    color: get_color_data.filter(({ color_id }) => d.c_color_id === color_id),
                    image: get_image_data.filter(({ p_product_id }) => d.c_product_id === p_product_id),
                }
            })

            return finalArray;
    }
    catch (error) {
        console.log(error);
    }
}

exports.viewCartDataUserLoggedIn = async (req, res, next) => {
    const data = await makeSynchronousRequest(req, res, next);
    res.send({
        data: data
    })
}
