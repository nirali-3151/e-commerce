const conn = require('../../app/models/dbConnection')

exports.updateAddressDetails = (req, res, next) => {
    const {
        address,
        land_mark,
        city,
        pincode,
        address_id
    } = req.body

    const sql = `UPDATE address SET address = ('${address}') ,land_mark = ('${land_mark}') , city = ('${city}') , pincode = ('${pincode}') WHERE address_id = ${address_id} RETURNING address_id `
    
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        else {
            res.send({
                data: data.rows,
                message: "View Address"
            })
        }
    })

}