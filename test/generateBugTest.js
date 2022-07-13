require('dotenv').config();
const log = require('../helpers/logger');
const rabbitmq = require('../helpers/rabbit');
const express = require('express');
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/', async (req, res) => {
	try {
		const {data} = req.body;
        const {cfg} = req.body;
        let snapshot = {};
		
		if (!data) {
            res.status(401).json('Error missing data property');
            return;
        }
        if (!cfg) {
            res.status(401).json('Error missing cfg property');
            return;
        }
		
		throw new Error("Testing error created..." +  JSON.stringify(data));
		
	} catch (e) {
        log.error(`ERROR: ${e}`);
        await rabbitmq.producerMessage(e);
        res.status(500).json(e);
    }
});

app.listen(PORT, () => log.info('Service up in port', PORT));