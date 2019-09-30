const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Parse incoming messages to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let testDB = [
    {
        username: 'Billy123',
        name: 'Billy',
        age: 20
    },
    {
        username: 'TheLegend27',
        name: 'John',
        age: 27
    }
];

app.get('/api/users', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'request for users received successfully',
        data: testDB
    })
});

app.post('/api/users', (req, res) => {
    // If username is not received
    if (!req.body.username) {
        return res.status(400).send({
            success: 'false',
            message: 'username is required',
            data: null
        });
    }

    else if (!req.body.name) {
        return res.status(400).send({
            success: 'false',
            message: 'name is required',
            data: null
        });
    }
    
    else if (!req.body.age) {
        return res.status(400).send({
            success: 'false',
            message: 'age is required',
            data: null
        });
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port ${PORT}`);
});