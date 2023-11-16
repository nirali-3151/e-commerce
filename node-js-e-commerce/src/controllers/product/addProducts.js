const conn = require('../../app/models/dbConnection')

exports.addProducts = async (req, res, next) => {
  const { product_name,
    available_size,
    color_name,
    price,
    discount,
    image_name,
    p_sub_catagory_id } = req.body

  const final_price = Math.ceil(price - (price * discount / 100))

  const sql = `INSERT into products(product_name ,p_sub_catagory_id , price , discount ,top_deals ,final_price) VALUES ('${product_name}' , '${p_sub_catagory_id}'  , '${price}' , '${discount}' ,'${false}','${final_price}') RETURNING product_id`
  conn.query(sql, async (err, rows, feilds) => {
    if (err) {
      res.send({
        success: false,
        err: err.message
      })
    }

    //add different sizes
    for (var i = 0; i < available_size.length; i++) {
      conn.query('INSERT into sizes(available_size , s_product_id ) VALUES ($1, $2) RETURNING *', [available_size[i], rows.rows[0].product_id], (error, results) => {
        if (err) {
          res.send({
            success: false,
            err: err.message
          })
        } else {
          console.log("size are : ", results.rows);
        }
      })
    }

    //add different colors
    for (var i = 0; i < color_name.length; i++) {
      conn.query('INSERT into colors(color_name , c_product_id ) VALUES ($1, $2) RETURNING *', [color_name[i], rows.rows[0].product_id], (error, results) => {
        if (err) {
          res.send({
            success: false,
            err: err.message
          })
        } else {
          console.log("colors are : ", results.rows);
        }
      })
    }

    //add multiple images
    for (var i = 0; i < image_name.length; i++) {
      conn.query('INSERT into product_image( image_name, p_product_id ) VALUES ($1, $2) RETURNING *', [image_name[i], rows.rows[0].product_id], (error, results) => {
        if (err) {
          res.send({
            success: false,
            err: err.message
          })
        } else {
          console.log("images are : ", results.rows);
        }
      })
    }
    res.send({
      success: true,
      data: rows.rows
    })
  })
}