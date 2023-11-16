const conn = require('../../app/models/dbConnection')

exports.addCatagories = async (req, res, next) => {
    const { catagory_name,
        thumb_nail_image } = req.body

    const sql = `INSERT into catagories(catagory_name ,thumb_nail_image ) VALUES ('${catagory_name}' , '${thumb_nail_image}') RETURNING catagory_id`

    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
        }
        else {
            res.send({
                success:true,
                message: `catagory ${data.rows[0].catagory_id} added to tghe database`
            })
        }
    })
}