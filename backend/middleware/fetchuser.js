var jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsJWTSecret";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.body.id = decodedToken.id;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Invalid Token, not authorized");
      }
    } else {
      res.status(401);
      throw new Error("token authorized , chutiya bnaya");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = fetchuser;
