require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const WS = 10;
let numberWindow = [];
const TOKEN = process.env.TOKEN;

const apiId = {
    p: 'primes',
    f: 'fibo',
    e: 'even',
    r: 'rand'
};

app.get('/numbers/:id', async (req, res) => {
    const id = req.params.id;
    const endPoint = apiId[id];

    if (!endPoint) {
        return res.status(400).json({ error: "Invalid Number ID" });
    }

    const url = `http://20.244.56.144/evaluation-service/${endPoint}`;
    const prevWindow = [...numberWindow];
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
        console.error("Error fetching data:", error.message || error);
        numbers = [];
    }

    // Update window with unique values
    for (const num of numbers) {
        if (!numberWindow.includes(num)) {
            numberWindow.push(num);
            if (numberWindow.length > WS) {
                numberWindow.shift();
            }
        }
    }

    // Calculate average
    let sum = 0;
    for (let i = 0; i < numberWindow.length; i++) {
        sum += numberWindow[i];
    }

    let avg = 0;
    if (numberWindow.length > 0) {
        avg = sum / numberWindow.length;
        avg = Math.round(avg * 100) / 100;
    }

    res.json({
        windowPrevState: prevWindow,
        windowCurrState: numberWindow,
        numbers: numbers,
        avg: avg
    });
});

app.get('/test', (req, res) => {
    res.send("Server is Working...");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
