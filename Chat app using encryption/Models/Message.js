import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiverUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    messages:{
        type: Array,
        required: true,
    },
},
{
    timestamps: true,
});

const Message = mongoose.model('Message',messageSchema);
export default Message;