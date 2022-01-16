const express = require('express');
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const port = 3001
app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

let data = {
    blue: 0,
    orange: 0
}

const socketIo = socket(server, {
    cors: {
        origin: "*",
    }
});

let running = false,
    runFor = 5000;


socketIo.on("connection", (socket) => {
    console.log("New client connected" + socket.id);

    socket.on("disconnect", () => {
        data = { blue: 0, orange: 0 };
        console.log("Client disconnected");
    });
});

app.post('/clickReceive', function (req, res) {
    const input = req.body
    if (running) {
        if (input.color === 'blue') {
            data.blue++
        }
        else if (input.color === 'orange') {
            data.orange++
        }
    } else {
        running = true;
        data = {
            blue: 0,
            orange: 0
        }
        if (input.color === 'blue') {
            data.blue++
        }
        else if (input.color === 'orange') {
            data.orange++
        }
    }
    console.log(data)
    // res.send('POST request to homepage')
    socketIo.emit('clickReceiver', data);
    setTimeout(function () {
        handleTimeout(data)
    }, runFor)
})

handleTimeout = (data) => {
    if (running) {
        running = false;
        socketIo.emit('chart', data);
    }
}



// io.on('connection', (socket) => {
//     console.log('a user connected');
// });