const db = require('../../app/models/dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = `SELECT * FROM users WHERE email= $1`
    const data = await db.query(query, [email]) //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        msg: "User is not registered, Sign Up first",
      });
    }
    else {
      bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) { //Checking if credentials match
          const token = jwt.sign({ user_id: user[0].user_id }, 'the-super-strong-secrect');
          return res.status(200).send(
            {
            msg: 'Logged in!',
            token,
            user: user[0]
          });
        }
        else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              msg: "Enter correct password!",
            });
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  };
};