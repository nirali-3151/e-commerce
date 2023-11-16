const conn = require('../../app/models/dbConnection')

exports.userDetails = (req, res, next) => {
    const { user_id } = req.query

    const sql = `SELECT * FROM users WHERE user_id = '${user_id}'`
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
                message: "users data"
            })
        }
    })
}