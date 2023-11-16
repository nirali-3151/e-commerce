const conn = require('../../app/models/dbConnection')

//update number of products in cart
exports.updateNumberOfProductInCart = async (req, res, next) => {
    const { number_of_product,
        cart_data_id } = req.body

    const sql = `UPDATE  cart_data SET number_of_product = ('${number_of_product}') WHERE cart_data_id = ('${cart_data_id}') RETURNING cart_data_id`
    const sql1 = `DELETE from cart_data WHERE  cart_data_id = ('${cart_data_id}') RETURNING cart_data_id `
    if (number_of_product !== 0) {
        conn.query(sql, function (err, data, feilds) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                res.send({
                    message: `cart  ${data.rows[0].cart_data_id} updated`
                })
            }
        })
    }
    else {
        conn.query(sql1, function (err, data, feilds) {
            if (err) {
                res.send({
                    success: false,
                    err: err.message
                })
            }
            else {
                res.send({
                    message: `cart deleted`
                })
            }
        })
    }
}