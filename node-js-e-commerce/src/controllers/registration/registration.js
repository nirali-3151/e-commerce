const bcrypt = require('bcryptjs'); //use to encrypt password
const jwt = require('jsonwebtoken'); //for generate a tokens

const db = require('../../app/models/dbConnection') //import database

exports.registerUserController = async (req, res) => {
    const { first_name,
        last_name,
        phone_number,
        email,
        password } = req.body;

    try {
        const query = `SELECT * FROM users WHERE email= $1`
        const data = await db.query(query, [email]); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                msg: "Email already there, No need to register again.",
            });
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const user = {
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    password: hash,
                };

                const query = `INSERT INTO users (first_name, last_name, phone_number ,email ,password ) VALUES ($1,$2,$3,$4 ,$5)  RETURNING user_id `

                //insert new user into database and generate token
                db.query(query, [user.first_name, user.last_name, user.phone_number, user.email, user.password], (err, rows) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        })
                    }
                    else {
                        const token = jwt.sign({ user_id: rows.rows[0].user_id }, 'the-super-strong-secrect');
                        res.status(200).send({
                            msg: 'User added to database',
                            token,
                        });
                    }
                })
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };
}