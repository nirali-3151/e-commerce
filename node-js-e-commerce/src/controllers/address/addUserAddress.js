const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')
exports.addAddressDetails = (req, res, next) => {

    const {
        address,
        land_mark,
        city,
        pincode,
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
    const sql = `INSERT into address (address , land_mark ,city , pincode ,a_user_id ,default_add) VALUES ('${address}','${land_mark}' ,'${city}' ,'${pincode}' , '${decoded.user_id}' ,false) RETURNING address_id`
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
                message: "address inserted"
            })
        }
    })
}