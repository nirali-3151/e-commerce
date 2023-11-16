const conn = require('../../app/models/dbConnection')

exports.updateSubCatagories = async (req, res, next) => {
    const { sub_catagory_name,
        sc_image,
        sc_catagory_id } = req.body

    const { id } = req.params

    const sql = `UPDATE  sub_catagories SET sub_catagory_name = ('${sub_catagory_name}'),sc_image =  ('${sc_image}')  WHERE sub_catagory_id = ('${id}') RETURNING sub_catagory_id`

    conn.query(sql, function (err, data, feilds) {

        if (err) {
            res.send({
                success: "false",
                error: err.message
            })
        }

        else {
            res.send({
                success : true,
                message: `sub catagory  ${data.rows[0].sub_catagory_id} updated`
            })
        }
    })
}