import { io } from "socket.io-client";
// import prompt from "prompt-sync";
import readline from "readline";

// Create prompt-sync instance to get input from the console
// const input = prompt();

// Create a readline interface for non-blocking input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to the Socket.io server
const socket = io("http://localhost:4000");

// When connected to the server
socket.on("connect", () => {
  console.log("Connected to the server", socket.id);

  // Continuously prompt for input in a loop
  const sendMessage = () => {
    // setInterval(() => {
    //   // const message = input('Enter a message: ');
    //   // // console.log(`Sending message: ${message}`);
    //   // socket.emit('client-message', message);  // Send message to the server
    //   rl.question(
    //     "Enter a message: ",
    //     (message) => {
    //       socket.emit("client-message", message);
    //     },
    //     1000
    //   ); // A delay to allow proper input handling
    // });
    rl.question("Enter a message: ", (message) => {
        socket.emit("client-message", message); // Send message to the server
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
