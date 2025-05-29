require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const WS = 10;
let window = []
const TOKEN = process.env.TOKEN

const apiId = {
    p: 'primes',
    f: 'fibo',
    e: 'even',
    r: 'rand'
};

app.get('/numbers/:id', async(req, res) => {
    const id = req.params.id;
    const endPoint = apiId[id];

    if (!endPoint) {
        return res.status(400).json({ error: "Invalid Number ID" })
    }
    const url = `http://20.244.56.144/evaluation-service/${endPoint}`;
    const prevWindow = [...window];
    let numbers = [];

    try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => source.cancel(), 500);

        const response = await axios.get(url, {
            headers: {
                Authorization: TOKEN
            },
            cancelToken: source.token
        });

        clearTimeout(timeout);
        numbers = response.data.numbers || [];
    } catch (error) {
        numbers = []
    }
})





app.get('/test', (req, res) => {
    res.send("Server is Working...")
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
