import express from 'express';
import * as db from './utils/db.js';
const app = express();
const port = 3000;

app.use(express.json());

async function addLog(method, logData) {
    const data = await db.read();
    data.logs.push({
        date: new Date().toISOString(),
        method,
        data: logData,
    });
    await db.write(data);
}

app.get('/ping', (req, res) => res.json({
    message: 'Server is up and running',
}));

app.get('/greeting', async (req, res) => {
    await addLog('GET', req.query);
    res.json({
        message: `Hello there ${req?.query?.name}!`,
    });
});

app.post('/greeting', async (req, res) => {
    await addLog('POST', req.body);
    res.json({
        message: `Hello there ${req?.body?.name}!`,
    });
});

app.get('/logs', async (req, res) => {
    const limit = Number(req?.query?.limit);
    const data = await db.read({ logs: [] });
    if (limit !== undefined && typeof limit === 'number' && limit > 0) {
        data.logs = data.logs.slice(-limit);
    }
    res.json(data);
});

app.post('/logs/reset', async (req, res) => {
    const { preserveLastN } = req.body;
    if (preserveLastN !== undefined && preserveLastN > 0) {
        const data = await db.read({ logs: [] });
        data.logs = data.logs.slice(-preserveLastN);
        await db.write(data);
    }
    else {
        await db.write({ logs: [] });
    }
    res.json();
});

app.listen(port, () => console.log(`Sample API listening on port ${port}`));