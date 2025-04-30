import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [  // Corrected from 'message' to 'messages'
    {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

// Create the model
const Conversation = mongoose.model('Conversation', conversationSchema);

// Export the model
export default Conversation;
