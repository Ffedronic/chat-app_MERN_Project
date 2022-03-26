const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

exports.register = (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        username: username,
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Registration successfull !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: "The user does not exist in the database" });
      }
      bcrypt
        .compare(password, user.password)
        .then((validatedUser) => {
          if (!validatedUser) {
            res.status(400).json({ message: "incorrect password" });
          }
          res.status(200).json({
            message: "Successfull connection",
            username: user.username,
            userId: user._id,
            avatarImage: user.avatarImage,
            token: jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              process.env.SECRET_KEY,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.setAvatar = (req, res, next) => {
  const userId = res.locals.userId;
  const { image } = req.body;
  User.findOne({ userId })
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: "The user does not exist in the database" });
      }
      User.updateOne(
        { _id: userId },
        {
          isAvatarImageSet: true,
          avatarImage: image,
        }
      )
        .then(() => {
          res
            .status(200)
            .json({ isSet: true, message: "Your profile picture is saved." });
        })
        .catch(() => {
          res.status(400).json({
            error: error,
            isSet: false,
            message: "Try again, your profile picture has not been saved.",
          });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = async (req, res, next) => {
 try{
  const users = await User.find({_id: { $ne: req.params.id }}).select(["email", "username", "avatarImage"]);
  return res.status(200).json({ users })
 } catch {
  res.status(500).json({message: "error with the server, please try again."})
 }
};
