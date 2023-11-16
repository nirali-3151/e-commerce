const conn = require('../../app/models/dbConnection')

exports.deleteProducts = async (req, res, next) => {
    const { id } = req.params

    const sql = `DELETE 
        FROM products WHERE product_id = ${id} RETURNING product_id`
    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        if (data.rows.length === 0) {
            res.send({
                message: `id is not available`
            })
        }
        else {
            res.send({
                id: data.rows[0].product_id,
                message: `delete product id ${data.rows[0].product_id}`
            })
        }
    })

}