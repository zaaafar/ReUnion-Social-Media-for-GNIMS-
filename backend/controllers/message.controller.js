import Conversation from "../models/conversation.model.js"; // Default import
import { getReceiverSocketId, io } from "../socket/socket.js";
import Message from "../models/message.model.js";

// for chatting
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { textMessage: message } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Establish the conversation if not started yet.
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []  // Initialize the messages array if not already present
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        // Push the new message ID into the conversation's messages array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save both the conversation and the new message
        await Promise.all([conversation.save(), newMessage.save()]);

        // Implement socket.io for real-time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate('messages');

        if (!conversation) return res.status(200).json({ success: true, messages: [] });

        return res.status(200).json({ success: true, messages: conversation?.messages });

    } catch (error) {
        console.log(error);
    }
};
