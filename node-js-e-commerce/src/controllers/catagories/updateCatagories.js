const e = require('express')
const conn = require('../../app/models/dbConnection')

exports.updateCatagories = async (req, res, next) => {
    const { catagory_name,
        thumb_nail_image } = req.body

    const { id } = req.params

    const sql = `UPDATE  catagories SET catagory_name = ('${catagory_name}'),thumb_nail_image =  ('${thumb_nail_image}') WHERE catagory_id = ('${id}') RETURNING catagory_id`

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
                message: `catagory  ${data.rows[0].catagory_id} updated`
            })
        }
    })

}