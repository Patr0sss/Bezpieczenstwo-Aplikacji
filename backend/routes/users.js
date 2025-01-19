const pool = require("../utils/db");
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
   try {
     const users = await pool.query('SELECT * FROM users');
     res.json(users.rows);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Server error" });
   }
 });
module.exports = router;
