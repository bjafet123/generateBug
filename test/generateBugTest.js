require('dotenv').config();
const log = require('../helpers/logger');
const msgbck = require('msgbrocker-nxg-cg');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/', async (req, res) => {
	let msg;
	try {
		const {data} = req.body;
        const {cfg} = req.body;
        let snapshot = {};
        msg = req.body;
		
		await msgbck.errorQueueListener();
		
		if (!data) {
            res.status(401).json('Error missing data property');
            return;
        }
        if (!cfg) {
            res.status(401).json('Error missing cfg property');
            return;
        }
		
		throw new Error("Testing error created..." + JSON.stringify(data));
		
	} catch (e) {
        log.error(`ERROR: ${e}`);
        const payload = JSON.stringify(msg);
		await msgbck.producerErrorMessage(payload, e);
        res.status(500).json(e);
        throw new Error(e.toString());
    }
});

app.listen(PORT, () => log.info('Service up in port', PORT));