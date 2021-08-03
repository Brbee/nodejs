const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');

const PORT = 3000;

app.use(express.json());

app.get('/double/:number', (req,res)=>{
    const double = req.params.number * 2;
    res.send({result: double});
})

app.get('/count', (req,res)=>{
    fs.readFile('count.txt', 'utf8', (err, data) => {
        let count = data;
        const countInt = Number(count) + 1;
        count = countInt.toString();
        fs.writeFile('count.txt', count, (err) => {console.log('number of visitors: ' + count)});
        res.send({count: countInt});
    })
})

app.get('/joke', (req,res) => {
    const request = axios.get('https://animechan.vercel.app/api/random');
    request.then(result=>{res.send({quote: result.data.quote});}).catch(err=>{console.log(err); throw err;});
})

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));