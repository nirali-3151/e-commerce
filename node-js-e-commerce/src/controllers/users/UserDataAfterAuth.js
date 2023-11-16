const conn = require('../../app/models/dbConnection')
const jwt = require('jsonwebtoken')
//get total number of cart data count
exports.UserDataAfterAuth = (req, res, next) => {

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
        var sql = `SELECT * from users Where user_id = '${decoded.user_id}'`
        conn.query(sql, function (err, data, fields) {
            if (err) throw err;
            res.send({ error: false,data:data.rows, message: 'user Data' });
        });
    }
    catch (err) {
        next(err);
    }
}