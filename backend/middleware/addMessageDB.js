const pool = require("../utils/db");


module.exports = function(sender_id,receiver_id, message) {
    consst today = new Date(); 
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
    const formattedDate = today.toLocaleString('pl-PL', options);
    try{
        await pool.query('INSERT INTO messages (sender_id,receiver_id, message,created_at) VALUES ($1,$2,$3,$4)', [user_one_id, user_two_id, message, formattedDate]);
        console.log('msg added');
    }
    catch(err){
        console.log(err);
    }
};