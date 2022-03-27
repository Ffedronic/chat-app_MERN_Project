const Messages = require("../models/messageModel");

const dotenv = require("dotenv");
dotenv.config();

/* This code is adding a message to the database. */
exports.addMessage = (req, res, next) => {
  const { from, to, message } = req.body;
  const addMessage = new Messages({
    message: { text: message },
    users: [from, to],
    sender: from,
  });
  addMessage
    .save()
    .then((response) => {
      res
        .status(200)
        .json({ message: "message have been successfully saved", response });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users:  {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    res.json(error);
  }
};
