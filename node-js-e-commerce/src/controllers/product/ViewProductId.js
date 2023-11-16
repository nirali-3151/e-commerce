const conn = require('../../app/models/dbConnection')

//view product first page
exports.viewProductWithId = (req, res, next) => {
    const {product_id} = req.query
    var sql = `SELECT * from products WHERE product_id = '${product_id}' ORDER BY product_id  `
    var sql1 = `SELECT * from sizes where s_product_id in (select product_id from products where product_id = '${product_id}')`;
    var sql2 = `SELECT * from colors where c_product_id in (select product_id from products where  product_id = '${product_id}')`;
    var sql3 = `SELECT * from product_image where p_product_id in (select product_id from products where  product_id = '${product_id}')`;
      
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
