const User = require("../models/userModel");

const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
      const user = new User({
        username: username,
          email: email,
          password: hash,
      });
      user.save()
          .then(() => res.status(201).json({ message: 'utilisateur créé !', user }))
          .catch(error => res.status(400).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};
