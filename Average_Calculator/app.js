const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/test',(req,res)=>{
    res.send("Server is Working...")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
