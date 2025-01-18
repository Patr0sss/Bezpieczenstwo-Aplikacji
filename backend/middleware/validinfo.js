module.exports = function(req, res, next) {
    const { name, password } = req.body;
  
  
    if (req.path === "/register") {
     
      if (![name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
    } else if (req.path === "/login") {
      if (![name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      }
    }
  
    next();
  };