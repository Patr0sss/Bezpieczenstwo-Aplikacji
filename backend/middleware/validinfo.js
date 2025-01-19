module.exports = function(req, res, next) {
    const { name, password } = req.body;
  
    // do dokończenia
    if (req.path === "/register") {
     
    } else if (req.path === "/login") {
      
    }
  
    next();
  };