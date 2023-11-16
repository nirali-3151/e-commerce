const conn = require('../../app/models/dbConnection')

const numPerPage = 5

//get total number of count of available products
exports.getTotalCountEveryProduct = (req, res, next) => {
    const sql = `SELECT count(*) FROM products`
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: "false",
                error: err
            })
        }
        res.send({
            data: data.rows,
            message: "count of available products"
        })
    })
}

//view product first page
exports.viewEveryProductFirstPage = (req, res, next) => {
    var sql = `SELECT * from products ORDER BY product_id DESC`
    var sql1 = `SELECT * from sizes where s_product_id in (select product_id from products)`;
    var sql2 = `SELECT * from colors where c_product_id in (select product_id from products)`;
    var sql3 = `SELECT * from product_image where p_product_id in (select product_id from products)`
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        conn.query(sql1, function (err, rows1, fields) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            conn.query(sql2, function (err, rows2, fields) {
                if (err) {
                    res.send({
                        success: false,
                        err: err.message
                    })
                }
                conn.query(sql3, function (err, rows3, fields) {
                    if (err) {
                        res.send({
                            success: false,
                            err: err.message
                        })
                    }

                    const finalArray = rows.rows.map(d => {
                        return {
                            ...d,
                            size: rows1.rows.filter(({ s_product_id }) => d.product_id === s_product_id),
                            color: rows2.rows.filter(({ c_product_id }) => d.product_id === c_product_id),
                            images: rows3.rows.filter(({ p_product_id }) => d.product_id === p_product_id),
                        }
                    })

                    res.send({ title: 'Users', rows: finalArray });
                });

            })
        })
    })
}

exports.viewProductNextPage = (req, res, next) => {
    const { p_sub_catagory_id, page } = req.query

    var skip = (page - 1) * numPerPage;

    var sql = `SELECT * from products WHERE p_sub_catagory_id = '${p_sub_catagory_id}' ORDER BY product_id LIMIT ${numPerPage} OFFSET ${skip} `
    var sql1 = `SELECT * from sizes where s_product_id in (select product_id from products where p_sub_catagory_id = '${p_sub_catagory_id}')`;
    var sql2 = `SELECT * from colors where c_product_id in (select product_id from products where  p_sub_catagory_id = '${p_sub_catagory_id}')`;
    var sql3 = `SELECT * from product_image where p_product_id in (select product_id from products where  p_sub_catagory_id = '${p_sub_catagory_id}')`

    conn.query(sql, function (err, rows, fields) {

        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        conn.query(sql1, function (err, rows1, fields) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            conn.query(sql2, function (err, rows2, fields) {
                if (err) {
                    res.send({
                        success: false,
                        err: err.message
                    })
                }
                conn.query(sql3, function (err, rows3, fields) {
                    if (err) {
                        res.send({
                            success: false,
                            err: err.message
                        })
                    }
                    const finalArray = rows.rows.map(d => {
                        return {
                            ...d,
                            size: rows1.rows.filter(({ s_product_id }) => d.product_id === s_product_id),
                            color: rows2.rows.filter(({ c_product_id }) => d.product_id === c_product_id),
                            images: rows3.rows.filter(({ p_product_id }) => d.product_id === p_product_id),
                        }
                    })
                    res.json({ title: 'Users', rows: finalArray });
                });
            })
        })
    })
}