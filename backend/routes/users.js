const pool = require("../utils/db");
var express = require('express');
var router = express.Router();
const authorize = require("../middleware/authorize");


router.get('/get-all', authorize, async function(req, res) {
   const user_id = req.user.id;
   try {
     const users = await pool.query('SELECT user_id,username  FROM users WHERE $1!=user_id', [user_id]);
     res.status(200).json(users.rows);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Server error" });
   }
 });

 
module.exports = router;
