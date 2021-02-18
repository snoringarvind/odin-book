const connection = require("../config/database");
const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //for e.g I am the sender and this array has information about all the people whom I has conversations with
  messages: [
    {
      //this is the user to whom I sent the message
      //so I will only fetch the messages which I have sent.
      //similarly the person will also only fetch messages which they have sent
      //and now we have the conversation from both
      //this way we don't need to save messages from both people
      message_container: [
        {
          message: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ],

      // message: { type: String },
      // date: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      //the time at which the the message was sent
      // date: Date.now(),
    },
  ],
});

const ChatModel = connection.model("Chat", ChatSchema);

module.exports = ChatModel;
