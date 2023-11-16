const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')

//get user added cart data id(currently not used)
exports.get_product_cart_data = (req, res, next) => {
    const { cart_id } = req.query
    const sql = `SELECT * FROM cart_data WHERE c_cart_id IN (SELECT cart_id FROM cart WHERE cart_id = '${cart_id}')`
    conn.query(sql, function (err, data, feild) {
        if (err) {
            res.send({
                success: "false",
                error: err
            })
        }
        res.send({
            data: data.rows,
            message: "count of available products"
        })
    })
}

//get use cart data if user logged in
exports.get_product_cart_data_user_id = (req, res, next) => {
    try {

        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        var sql = `SELECT * FROM cart_data WHERE c_cart_id IN (SELECT cart_id FROM cart WHERE c_user_id = '${decoded.user_id}')`

        conn.query(sql, function (err, data, fields) {
            if (err) throw err;
            let values = data.rows

            const uniqueIds = [];
            let productId;
            let unitcost1 = [];
            let sum = 0

            const unique = values.filter(element => {
                const isDuplicate = uniqueIds.includes(element.c_product_id);
                if (!isDuplicate) {
                    const obj = element.c_product_id;

                    uniqueIds.push(obj);
                    return true;
                }
                else {
                    // console.log("else");
                    // // pro = element.c_product_id
                    // // console.log("else");
                    // uniqueIds.map((uniq) => {
                    //     console.log("element.c_product_id", element.number_of_product);
                    //     console.log("uniq.c_product_id", uniq);
                    //     return (
                    //         uniq === element.c_product_id ?
                    //         // values[number_of_product-1] += element.number_of_product
                    //             console.log("hello" , sum += element.number_of_product) :
                    //             console.log("world")
                    //         // "gh"
                    //         // uniq.c_product_id === element.c_product_id ? 
                    //         //  console.log("element.sum" , element.number_of_product):
                    //         //  console.log("element.sum" , element.number_of_product)
                    //     )
                    // })
                    // console.log("sum is : "  ,sum);
                    // if (productId == arr[element].idProduct) {
                    //     unitcost[unitcost.length - 1] += arr[a].unitCost;
                    // }
                }
            });
            // const result = values.filter(e => lookup[e.c_product_id])
            // console.log("ghjhjh", result);
            // let sum = 0
            // for (let i = 0; i < result.length; i++) {
            //     if(result[i].number_of_product)
            //     sum += parseInt(result[i].number_of_product);
            // }
            // console.log("sum is : ", sum);
            // let arr = [{ "idProduct": 1, "unitCost": 400 }, { "idProduct": 1, "unitCost": 160 }, { "idProduct": 1, "unitCost": 46 }, { "idProduct": 2, "unitCost": 200 }, { "idProduct": 2, "unitCost": 40 }]

            // let pro;
            // let unitcost = [];
            // for (var a = 0; a < arr.length; a++) {
            //     if (pro == arr[a].idProduct) {
            //         console.log("iffffffffffff");
            //         unitcost[unitcost.length - 1] += arr[a].unitCost;
            //         console.log("unitcost is : " , unitcost);
            //         console.log("unitcost[unitcost.length - 1] " ,unitcost[unitcost.length - 1] ,arr[a].unitCost );
            //         console.log("unitcost[unitcost.length - 1] += arr[a].unitCost" ,unitcost[unitcost.length - 1] += arr[a].unitCost);
            //     }
            //     else {
            //         console.log(" arr[a].unitCost" , arr[a].unitCost);
            //         pro = arr[a].idProduct;
            //         // unitcost.push(pro );
            //         let unitcost1 = { unitcost2: arr[a].unitCost }
            //         console.log("unitcost 1 si : ", unitcost1);
            //         unitcost.push(unitcost1.unitcost2);

            //     }
            // }
            // console.log(unitcost);
            res.send({ error: false, data: unique, message: 'data updated' });
        });
    }
    catch (err) {
        next(err);
    }
}