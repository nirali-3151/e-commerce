const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')

exports.userAddressDetailsDefault = (req, res, next) => {

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

    const sql = `SELECT * from address WHERE a_user_id = '${decoded.user_id}' AND default_add = true ORDER BY address_id`
    const sql1 = `SELECT * from users WHERE user_id = ${decoded.user_id}`

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
                    user:data1.rows,
                    data: data.rows,
                    message: "View Address"
                })
            }
        })
    })
}

exports.userAddressDetails = (req, res, next) => {

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

    const sql = `SELECT * from address WHERE a_user_id = '${decoded.user_id}' ORDER BY address_id`
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