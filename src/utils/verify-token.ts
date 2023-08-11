const jwt = require('jsonwebtoken');

export function verifyToken(req, res, next){
    const headers = req.headers;
    const authorization = headers?.authorization;
    if(!authorization) {
      res.status(401).json({message: 'You do not have authorization!'})
      return;
    };
    const token = authorization.split(" ")[1];
    console.log(token)
    try{
      jwt.verify(token, process.env.JWT_SECRET)
    } catch(e) {
      res.status(401).json({message: 'You do not have authorization!'})
      return;
    }
    return next();
  }