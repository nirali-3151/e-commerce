const conn = require('../../app/models/dbConnection')

exports.viewCatagories = (req, res, next) => {

    const sql = `SELECT * FROM catagories order by catagory_id DESC`
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
                message: "catagory list"
            })
        }
    })
}