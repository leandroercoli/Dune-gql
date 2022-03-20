const jwt = require("jsonwebtoken");

const context = async ({ req, res }) => {
  const context = {
    req,
    res,
    token: null,
  };

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (!err) context.token = decoded;
  });

  return context;
};

module.exports = context;
