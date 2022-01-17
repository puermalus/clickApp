const express = require('express');
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const port = 3001
app.use(cors());
app.use(express.json());
const lodash = require('lodash');

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

let data = {
    blue: 0,
    orange: 0
}
let startTime = 0;

let responseData = {
    orange: [],
    blue: []
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
            responseData.blue.push(Math.round(Date.now() / 1000) - startTime)
        }
        else if (input.color === 'orange') {
            data.orange++
            responseData.orange.push(Math.round(Date.now() / 1000) - startTime)
        }
    } else {
        running = true;
        startTime = Math.round(Date.now() / 1000);
        responseData = {
            orange: [],
            blue: []
        }
        data = {
            blue: 0,
            orange: 0
        }
        if (input.color === 'blue') {
            data.blue++
            responseData.blue.push(Math.round(Date.now() / 1000) - startTime)
        }
        else if (input.color === 'orange') {
            data.orange++
            responseData.orange.push(Math.round(Date.now() / 1000) - startTime)
        }
    }
    console.log(data)
    // res.send('POST request to homepage')
    socketIo.emit('clickReceiver', data);

    setTimeout(() => handleTimeout(responseData), runFor)
})
const getValueByColor = (index, data) => {
    const result = lodash.get(data, index);
    return result !== undefined ? result : 0;
}

handleTimeout = (responseData) => {
    if (running) {
        running = false;
        const response = [];
        const responseBlue = lodash.countBy(responseData.blue)
        const responseOrange = lodash.countBy(responseData.orange)
        for(let i = 0; i<=5; i++) {
            const blueData = getValueByColor(i, responseBlue);
            const orangeData = getValueByColor(i, responseOrange);
            response.push({
                name: i.toString(),
                blue: blueData,
                orange: orangeData
            })
        }
        socketIo.emit('chart', response);
    }
}




// io.on('connection', (socket) => {
//     console.log('a user connected');
// });