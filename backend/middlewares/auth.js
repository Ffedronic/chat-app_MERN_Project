const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const userId = req.params.id;

    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.decode(token, process.env.SECRET_KEY);

    if (userId !== decodedToken.userId) {
      res.status(401).json({ message: "Modification not authorized." });
    } else {
      res.locals.userId = decodedToken.userId;

      next();
    }
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
