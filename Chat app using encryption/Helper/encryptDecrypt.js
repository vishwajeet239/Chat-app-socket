import Crypto from "crypto-js";

const key = 'secretKey';

const encrypt = (data) =>{
    const encrypted = Crypto.AES.encrypt(data, key).toString();
    return encrypted;
};

const decrypt = (encryptedData) =>{
    try {
        const bytes = Crypto.AES.decrypt(encryptedData,key);
        if(bytes.sigBytes > 0) {
            const decryptedData = bytes.toString(Crypto.enc.Utf8);
            return decryptedData;
        }
    } catch (error) {
        throw new Error('Decrypt failed');
    }
};

export default {encrypt, decrypt};
