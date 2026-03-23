import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        receiverID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        text:{
            type: String
        },
        image:{
            type: String
        }
    },
    { timestamp: true}
);

const Message = mongoose.model("Message", messageSchema);
export default Message;