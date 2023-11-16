const conn = require('../../app/models/dbConnection')

exports.deleteSubCatagories = async (req, res, next) => {
    const { id } = req.params

    const sql = `DELETE from sub_catagories WHERE sub_catagory_id = '${id}' RETURNING sub_catagory_id`

    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: "false",
                error: err.message
            })
        }
        else {
            res.send({
                id:data.rows[0].sub_catagory_id,
                message: `delete ${data.rows[0].sub_catagory_id}`
            })
        }
    })

}