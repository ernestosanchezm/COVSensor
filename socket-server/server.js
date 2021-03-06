const app = require("express")();
const http = require("http").Server(app);
const mqtt = require("mqtt");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello there");
});

function parsePayload(payload) {
  if (payload instanceof Buffer) {
    payload = payload.toString("utf8");
  }

  try {
    payload = JSON.parse(payload);
  } catch (e) {
    payload = {};
  }

  return payload;
}

let client;
//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  client = mqtt.connect(
    //"mqtt://ec2-3-142-221-143.us-east-2.compute.amazonaws.com"
    "mqtt://192.168.1.4"
  );
  client.subscribe("coordinator/message");

  client.on("message", (topic, payload) => {
    payload = parsePayload(payload);
    io.emit("metrics", payload);
    console.log(payload);
    let broadcast = false;
    switch (topic) {
      case "coordinator/connected":
      case "coordinator/disconnected":
      case "coordinator/message":
        broadcast =
          payload &&
          payload.coordinator &&
          payload.coordinator.uuid !== this._coordinatorId;
        break;
    }

    if (broadcast) {
      this.emit(topic, payload);
    }
  });

  socket.on("hello", (msg) => {
    console.log(`Hello ${msg}`);
    io.emit("me", "Alguien");
  });

  socket.on("alarm/on", (msg) => {
    console.log("APAGAR ALARMA");
    client.publish("coordinator/alarm/on","A1");
    // const alarm = {id: id, status: "off"};
    // io.emit('client:alarm/off', alarm)
    console.log("Alarm", msg);
  });

  socket.on("alarm/off", (msg) => {
    console.log("APAGAR ALARMA");
    client.publish("coordinator/alarm/off","A1");
    // const alarm = {id: id, status: "off"};
    // io.emit('client:alarm/off', alarm)
    console.log("Alarm", msg);
  });

  socket.on("air-bomb/on", (msg) => { 
    client.publish("coordinator/air-bomb/on","A1");
    // const airbomb = {id: id, status: "on"};
    // io.emit('client:air-bomb/on', airbomb)
    console.log("Air Bomb", msg);
  });

  socket.on("air-bomb/off", (msg) => {
    client.publish("coordinator/air-bomb/off","A1");
    // const airbomb = {id: id, status: "off"};
    // io.emit('client:air-bomb/off', airbomb)
    console.log("Air Bomb", msg);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
