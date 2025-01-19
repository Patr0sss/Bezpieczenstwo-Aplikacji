const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const jwtGenerator = require("../utils/jwtGen");
const authorize = require("../middleware/authorize");
const validation = require("../middleware/validinfo");


router.post("/register",  async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    let newUser = await pool.query(
      "INSERT INTO users (username, user_password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.status(200).json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login",  async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credentials");
    }

    const validPassword = password === user.rows[0].user_password;

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.status(200).json({ jwtToken, username, user_id: user.rows[0].user_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;