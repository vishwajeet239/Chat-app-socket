import message from "../Models/Message.js"
import crypto from "../Helper/encryptDecrypt.js"

const storeMessage = async (req,res)=>{
    const {senderuserId,receiveruserId,msg} = req.body;
    try {
        const encryptedMsg = crypto.encrypt(msg);
        const newMessage = new message({
            senderUser: senderuserId,
            receiverUser:receiveruserId,
            messages: [encryptedMsg]
        });

        await newMessage.save();
        res.status(200).json({msg: "Message stored successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to store message"});
    }
};

const getAllMessage = async (req,res)=>{
    const {userId } = req.body;
    try {
        const messages = await message.find({user:userId});
        const decryptedMsg = crypto.decrypt(messages);

        res.status(200).json({msg:decryptedMsg});
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
}

export default {storeMessage, getAllMessage};