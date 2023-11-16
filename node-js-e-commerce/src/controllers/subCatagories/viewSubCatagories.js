const conn = require('../../app/models/dbConnection')

exports.viewSubCatagories = (req, res, next) => {
    const { catagory_id } = req.query
    const sql = `SELECT * FROM sub_catagories WHERE sc_catagory_id = '${catagory_id}'`
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: "false",
                error: err.message
            })
        }
        else {
            res.send({
                success:true,
                data: data.rows,
                message: "sub catagory list"
            })
        }
    })
}