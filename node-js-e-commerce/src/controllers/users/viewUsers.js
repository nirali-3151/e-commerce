const conn = require('../../app/models/dbConnection')

exports.viewUsersList = (req, res, next) => {

    const sql = `SELECT * FROM users order by user_id`
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
                message: "Users list"
            })
        }
    })
}