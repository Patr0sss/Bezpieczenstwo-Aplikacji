const pool = require("../utils/db");
var express = require('express');
var router = express.Router();
const authorize = require("../middleware/authorize");


router.get('/get-all', authorize, async function(req, res) {
   const user_id = req.user.id;
   try {
     const users = await pool.query(`SELECT user_id,username  FROM users WHERE ${user_id}!=user_id`);
     res.status(200).json(users.rows);
   } catch (err) {
     
     res.status(500).json({ error: "Server error" });
   }
 });

router.post('/get-messages', authorize, async function(req,res){
  const user_one_id = req.user.id
  const {user_two_id} = req.body
 
  try {
    const user_one_msg = await pool.query(`SELECT * FROM messages Where (sender_id=${user_one_id} AND receiver_id=${user_two_id}) OR (sender_id=${user_two_id} AND receiver_id=${user_one_id})`);
    res.status(200).json(user_one_msg.rows);
  } catch (err){
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/post-messages', authorize, async function(req,res) {
  const user_one_id = req.user.id 
  const {user_two_id,message} = req.body
  const today = new Date();
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  const formattedDate = today.toLocaleString('pl-PL', options);
  console.log(formattedDate)
  try {
    await pool.query(`INSERT INTO messages (sender_id,receiver_id, message,created_at) VALUES (${user_one_id},${user_two_id},${message},${formattedDate})`);
    res.status(200).json({msg: "message added"});
  }
  catch (err){
    res.status(500).json({error: "Server error"});
  }
})

router.get('/get-user/:id', async function(req,res) {
  const id = req.params.id;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE user_id = ${id}`);
    res.status(200).json(data.rows);
  }
  catch (err){
    res.status(500).json({error: "error"});
    
  }
})
router.get('/get-user-msgs/:id', async function(req,res) {
  const id = req.params.id;
  try {
    const msgs = await pool.query(`SELECT * FROM messages WHERE sender_id =('${id}')`);
    res.status(200).json(msgs.rows);
  }
  catch (err){
    res.status(500).json({error: "error"});
  }
})

module.exports = router;
