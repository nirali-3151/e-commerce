const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')
//get total number of cart data count
exports.cartDataCountUserId = (req, res, next) => {
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
        var sql = `SELECT count(*) FROM cart_data WHERE c_cart_id IN(SELECT cart_id FROM cart Where c_user_id = '${decoded.user_id}')`
        conn.query(sql, function (err, data, fields) {
            if (err) throw err;
            res.send({ error: false,data:data.rows, message: 'data updated' });
        });
    }
    catch (err) {
        next(err);
    }
}