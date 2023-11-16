const conn = require("../../app/models/dbConnection")

//view all the orders at admin side
exports.viewAllOrdersList = (req, res, next) => {
    const sql = `SELECT * FROM orders`
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