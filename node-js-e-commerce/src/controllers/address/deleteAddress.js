const conn = require('../../app/models/dbConnection')

exports.deleteAddressDetails = (req, res, next) => {
    const { id } = req.params

    const sql = `DELETE from address WHERE address_id = '${id}' RETURNING address_id`
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        else {

            res.send({
                data:data.rows[0].address_id,
                message: `user Address ${data.rows[0].address_id} deleted`
            })
        }
    })
}