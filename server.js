const express = require('express');
const app = express();
const PORT = 8000;

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
        users: testDB
    })
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port ${PORT}`);
});