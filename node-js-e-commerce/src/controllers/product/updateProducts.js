const conn = require('../../app/models/dbConnection')
const pgp = require('pg-promise')();
const _ = require('lodash')

//update product data
function getPromise(req, res, next) {
  const { product_name,
    price,
    discount,
    p_sub_catagory_id } = req.body
  const { product_id } = req.query

  const final_price = Math.ceil(price - (price * discount / 100))

  return new Promise((resolve, reject) => {
    const sql = `UPDATE  products SET product_name = '${product_name}',p_sub_catagory_id = '${p_sub_catagory_id}', price = '${price}' , discount = '${discount}' ,final_price = '${final_price}' WHERE product_id = '${product_id}' RETURNING product_id`
    conn.query(sql, async function (err, rows, feild) {
      if (err) {
        res.send({
          success: false,
          err: err.message
        })
      }
      else {

        resolve(rows.rows)
      }
    })
  });
}

//get filterd size data
function getPromise2(req, res, next) {
  const { product_id } = req.query
  const { size } = req.body
  const { old_size } = req.body
  const match_size_id_object = []
  const match_size_array = []

  return new Promise(async (resolve, reject) => {
    const data = size.map((s) => {
      return {
        available_size: s,
        s_product_id: product_id
      }
    })

    old_size.map((si) => {
      return (
        data.map((s) => {
          return (
            si.available_size === s.available_size ?
              {
                match_size_id_object: match_size_id_object.push(si),
                match_size_array: match_size_array.push(s)
              }
              :
              null
          )
        })
      )
    })

    const data_to_delete = old_size.filter(val => !match_size_id_object.includes(val));
    const data_to_insert = data.filter(val => !match_size_array.includes(val));

    resolve({
      data_to_delete: data_to_delete,
      data_to_insert: data_to_insert
    })
  })
}

//delete size data
function getPromise3(get_filtered_size_data, req, res, next) {
  const delete_data = get_filtered_size_data.data_to_delete
  return new Promise(async (resolve, reject) => {
    if (_.isEmpty(delete_data)) {
      resolve({
        success: true,
        message: "There is no data to delete"
      })
    }
    else {
      const sql1 = `DELETE from sizes WHERE size_id = $1 RETURNING *`
      delete_data.forEach(element => {
        conn.query(sql1, [element.size_id], async function (err, rows1, feild) {
          if (err) {
            res.send({
              success: false,
              err: err.message
            })
          }
          else {
            resolve({
              success: true,
              message: "data is deleted"
            })
          }
        })
      });
    }
  })
}

//insert size data
function getPromise4(get_filtered_size_data, req, res, next) {
  const data_to_insert = get_filtered_size_data.data_to_insert
  return new Promise(async (resolve, reject) => {
    if (_.isEmpty(data_to_insert)) {
      resolve({
        success: true,
        message: "There is no data to insert"
      })
    }
    else {
      const setTable = new pgp.helpers.ColumnSet(['available_size', 's_product_id'], { table: 'sizes' });
      const returning = `RETURNING size_id`
      const insertOnConflict = pgp.helpers.insert(data_to_insert, setTable) + returning
      const result = await conn.query(insertOnConflict);
      resolve({
        success: true,
        message: "data is inserted"
      })
    }
  })
}

//get filterd image data
function getPromise5(req, res, next) {
  const { product_id } = req.query
  const { images } = req.body
  const { old_images } = req.body
  const match_product_data_to_delete = []

  return new Promise(async (resolve, reject) => {
    old_images.map((old) => {
      return (
        images.map((current) => {
          return (
            old.product_image_id === current.product_image_id ?
              {
                match_product_data_to_delete: match_product_data_to_delete.push(old),
              }
              :
              null
          )
        })
      )
    })

    const data_to_delete = old_images.filter(val => !match_product_data_to_delete.includes(val));

    resolve({
      data_to_delete: data_to_delete,
    })
  })
}

//delete image data
function getPromise6(get_filtered_size_data, req, res, next) {
  const delete_data = get_filtered_size_data.data_to_delete
  return new Promise(async (resolve, reject) => {
    if (_.isEmpty(delete_data)) {
      resolve({
        success: true,
        message: "There is no data to delete"
      })
    }
    else {
      const sql1 = `DELETE from product_image WHERE product_image_id = $1 RETURNING *`
      delete_data.forEach(element => {
        conn.query(sql1, [element.product_image_id], async function (err, rows1, feild) {
          if (err) {
            res.send({
              success: false,
              err: err.message
            })
          }
          else {
            resolve({
              success: true,
              message: "data is deleted"
            })
          }
        })
      });
    }
  })
}

//insert image data
function getPromise7(req, res, next) {
  const { newly_added_images } = req.body
  const { product_id } = req.query
  return new Promise(async (resolve, reject) => {
    if (_.isEmpty(newly_added_images)) {
      resolve({
        success: true,
        message: "There is no images to insert"
      })
    }
    else {
      const data = newly_added_images.map((images) => {
        return {
          p_product_id: product_id,
          image_name: images
        }
      })
      const setTable = new pgp.helpers.ColumnSet(['p_product_id', 'image_name'], { table: 'product_image' });
      const returning = `RETURNING product_image_id`
      const insertOnConflict = pgp.helpers.insert(data, setTable) + returning
      const result = await conn.query(insertOnConflict);
      resolve({
        success: true,
        message: "data is inserted"
      })
    }
  })
}

//get filterd colors data
function getPromise8(req, res, next) {
  const { product_id } = req.query
  const { colors } = req.body
  const { old_colors } = req.body
  const match_color_data_to_delete = []
  const match_color_data_to_insert = []

  return new Promise(async (resolve, reject) => {
    const data = colors.map((s) => {
      return {
        color_name: s,
        c_product_id: product_id
      }
    })

    old_colors.map((si) => {
      return (
        data.map((s) => {
          return (
            si.color_name === s.color_name ?
              {
                match_color_data_to_delete: match_color_data_to_delete.push(si),
                match_color_data_to_insert: match_color_data_to_insert.push(s)
              }
              :
              null
          )
        })
      )
    })

    const data_to_delete = old_colors.filter(val => !match_color_data_to_delete.includes(val));
    const data_to_insert = data.filter(val => !match_color_data_to_insert.includes(val));

    resolve({
      data_to_delete: data_to_delete,
      data_to_insert: data_to_insert
    })
  })
}

//delete colors data
function getPromise9(get_filtered_colors_data, req, res, next) {
  const delete_data = get_filtered_colors_data.data_to_delete
  return new Promise(async (resolve, reject) => {
    if (_.isEmpty(delete_data)) {
      resolve({
        success: true,
        message: "There is no data to delete"
      })
    }
    else {
      const sql1 = `DELETE from colors WHERE color_id = $1 RETURNING *`
      delete_data.forEach(element => {
        conn.query(sql1, [element.color_id], async function (err, rows1, feild) {
          if (err) {
            res.send({
              success: false,
              err: err.message
            })
          }
          else {
            resolve({
              success: true,
              message: "data is deleted"
            })
          }
        })
      });
    }
  })
}

//insert color data
function getPromise10(get_filtered_colors_data, req, res, next) {
  const data_to_insert = get_filtered_colors_data.data_to_insert
  return new Promise(async (resolve, reject) => {
    if (_.isEmpty(data_to_insert)) {
      resolve({
        success: true,
        message: "There is no data to insert"
      })
    }
    else {
      const setTable = new pgp.helpers.ColumnSet(['color_name', 'c_product_id'], { table: 'colors' });
      const returning = `RETURNING color_id`
      const insertOnConflict = pgp.helpers.insert(data_to_insert, setTable) + returning
      const result = await conn.query(insertOnConflict);
      resolve({
        success: true,
        message: "data is inserted"
      })
    }
  })
}


async function makeSynchronousRequest(req, res, next) {
  try {
    //update product data
    let http_promise = getPromise(req, res, next);
    let product_data = await http_promise;

    //get filtered size  data
    let http_promise2 = getPromise2(req, res, next);
    let get_filtered_size_data = await http_promise2;
    // delete extra size data
    let http_promise3 = getPromise3(get_filtered_size_data, req, res, next);
    await http_promise3;
    //insert new sizes data
    let http_promise4 = getPromise4(get_filtered_size_data, req, res, next);
    await http_promise4;

    //get filterd image  data
    let http_promise5 = getPromise5(req, res, next);
    let get_filtered_image_data = await http_promise5;
    // delete extra size data
    let http_promise6 = getPromise6(get_filtered_image_data, req, res, next);
    const data = await http_promise6;
    //insert new sizes data
    let http_promise7 = getPromise7(req, res, next);
    await http_promise7;

    //get filterd colors  data
    let http_promise8 = getPromise8(req, res, next);
    let get_filtered_colors_data = await http_promise8;
    // delete extra colors data
    let http_promise9 = getPromise9(get_filtered_colors_data, req, res, next);
    await http_promise9;
    // //insert new colors data
    let http_promise10 = getPromise10(get_filtered_colors_data, req, res, next);
    await http_promise10;

    return {
      success: true,
      message: "data updated"
    }
  }
  catch (error) {
    console.log(error);
  }
}

exports.updateProducts = async (req, res, next) => {
  const data = await makeSynchronousRequest(req, res, next);
  res.send({
    data: data
  })
}