const conn = require('../../app/models/dbConnection')

exports.deleteCatagories = async (req, res, next) => {
    const { id } = req.params

    const sql =  `DELETE from catagories AS c WHERE c.catagory_id = '${id}' RETURNING catagory_id`

    conn.query(sql, function (err, data, feilds) {
        if (err) {
            res.send({
                success: false,
                err: err.message
            })
            console.log("err.message", err.message);
        }
        else {
            res.send({
                id : data.rows[0].catagory_id,
                message: `delete ${data.rows[0].catagory_id}`
            })
        }
    })

}