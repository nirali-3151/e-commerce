const conn = require('../../app/models/dbConnection')
const jwt = require("jsonwebtoken")

exports.updatedefaultAddressDetails = (req, res, next) => {
    const {
        address_id
    } = req.body

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
    const sql = `UPDATE address SET default_add = false WHERE a_user_id = ${decoded.user_id} RETURNING address_id`
    const sql1 = `UPDATE address SET default_add = true WHERE address_id = ${address_id} RETURNING address_id`
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        conn.query(sql1, function (err, data1, feild) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                res.send({
                    data: data.rows,
                    message: "update"
                })
            }
        })
    })

}