// Create a simple API that receives a name and returns a greeting message
import express from 'express';
const app = express();
const port = 3000;

app.get('/greeting', (req, res) => res.json({
    message: 'Hello there!'
}));

app.post('/greeting', (req, res) => res.json({
    message: `Hello there ${req.body.name}!`,
}));

app.listen(port, () => console.log(`Sample API listening on port ${port}`));