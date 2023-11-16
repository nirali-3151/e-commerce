const conn = require('../../app/models/dbConnection')

exports.addSubCatagories = async (req, res, next) => {
    const { sub_catagory_name,
        sc_image,
        sc_catagory_id } = req.body

    const sql = `INSERT into sub_catagories(sub_catagory_name ,sc_image ,sc_catagory_id ) VALUES ('${sub_catagory_name}' , '${sc_image}' , '${sc_catagory_id}') RETURNING sub_catagory_id`

    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: "false",
                error: err.message
            })
        }
        else {
            res.send({
                success:true,
                message: `sub catagory ${data.rows[0].sub_catagory_id} added to tghe database`
            })
        }
    })
}