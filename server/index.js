const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const data = {
    blue: 0,
    orange: 0
}

app.post('/clickReceive', function (req, res) {
    const input = req.body
    console.log(req)
    if (input.color === 'blue') {
        data.blue++
    }
    else if (input.color === 'orange') {
        data.orange++
    }
    console.log(data)
    res.send('POST request to homepage')
})