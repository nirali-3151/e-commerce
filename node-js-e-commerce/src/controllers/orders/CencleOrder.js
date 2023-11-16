const conn = require("../../app/models/dbConnection")

exports.cencleOrder = async (req, res, next) => {
    const { id } = req.params

    const sql =  `UPDATE orders SET order_flag = false WHERE order_id = ('${id}') RETURNING order_id`

    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        else {
            res.send({
                id : data.rows[0].order_id,
                message: `order cencalled`
            })
        }
    })

}