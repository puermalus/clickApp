const express = require('express')
const http = require("http");
const app = express()
const server = http.createServer(app);
const cors = require("cors");
// const io = require("socket.io")(3002);
const port = 3001
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const data = {
    blue: 0,
    orange: 0
}

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 


socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);

    socket.on("submitClicked", function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
        socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
});

app.post('/clickReceive', function (req, res) {
    const input = req.body
    if (input.color === 'blue') {
        data.blue++
    }
    else if (input.color === 'orange') {
        data.orange++
    }
    // console.log(data)
    // res.send('POST request to homepage')
    io.on("connection", (socket) => {
        socket.emit("receive", data);
    });
})


// io.on('connection', (socket) => {
//     console.log('a user connected');
// });