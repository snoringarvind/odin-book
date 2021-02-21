const connection = require("../config/database");
const mongoose = require("mongoose");

//we are making this model to map the conversation list.
//now from the 'Chat' model we do have the ids of people to whom we have sent the messages.
//but it might happen that I have not sent a message to the other user, but they might have sent messages to me
//so in such cases I won't be able to map the conversations of people to whom I have not replied

const ChatListSchema = mongoose.Schema({
  //for eg.arvind is the sender
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //the  list of users from whom I received messages.
  //and also saving if I have read their messages or not
  received: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      isread: [{ type: Boolean }],
    },
  ],

  //this is the id we are also saving in 'Chat' model
  //the list of users to whom I have sent the messages.
  //*here we don one thing instead of saving all the users, we save only the names of the users who have not replied
  //so this way we won't have unnecessary duplicate names in recevived as well as sent
  // delete the user from sent once we get their reply.
  sent: [{ type: mongoose.Schema.Types.ObjectId }],
});

const ChatListModel = connection.model("ChatList", ChatListSchema);

module.exports = ChatListModel;
