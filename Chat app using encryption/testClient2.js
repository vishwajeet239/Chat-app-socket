import { io } from "socket.io-client";
import readline from "readline";
import enc from "./Helper/encryptDecrypt.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://localhost:4000");

// When connected to the server
socket.on("connect", () => {
    console.log("Connected to the server", socket.id);
  
    // Continuously prompt for input in a loop
    const sendMessage = () => {

      rl.question("Enter a message: ", (message) => {
          const encryptedMessage = enc.encrypt(message);
          console.log(`Sending encrypted message: ${encryptedMessage}`);
          const decryptedMessage = enc.decrypt(encryptedMessage);
          socket.emit("client-message", decryptedMessage); // Send message to the server
          sendMessage(); // After sending, prompt for the next message
        });
    };
    sendMessage(); // Start the input loop
  });
  
  // Listen for broadcasted messages from the server (from other clients)
  socket.on("client-message", (msg) => {
    console.log(`Message from another client: ${msg}`);
  });
  
  // Handle disconnection from the server
  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });
  