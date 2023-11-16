const conn = require('../../app/models/dbConnection')

exports.getAllSubCatagory = (req, res, next) => {

    const sql = `SELECT * from sub_catagories WHERE sc_catagory_id != 62 LIMIT 15`
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
                message: "View sub catatagory"
            })
        }
    })

}