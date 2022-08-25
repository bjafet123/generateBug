require('dotenv').config();
const {constants, log} = require('utils-nxg-cg');
const {producerErrorMessage} = require('msgbroker-nxg-cg');
//const msgbrk = require('msgbroker-nxg-cg');
const {loging_elastic, objectLevels} = require('loging-elastic-cg-lib');
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
		
		await loging_elastic(data, objectLevels.info);
		
		//await msgbrk.errorQueueListener();
		
		if (!data) {
            res.status(401).json(`${constants.ERROR_PROPERTY} data`);
            return;
        }
        if (!cfg) {
            res.status(401).json(`${constants.ERROR_PROPERTY} cfg`);
            return;
        }
		
		//await msgbrk.producerMessage('Hola','myQueue');
		
		throw new Error("Testing error created..." + JSON.stringify(data));
		
	} catch (e) {
		await loging_elastic(e, objectLevels.error);
        log.error(`ERROR: ${e}`);
		await producerErrorMessage(msg, e.toString());
        res.status(500).json(e);
        //throw new Error(e.toString());
    }
});

app.listen(PORT, () => log.info('Service up in port', PORT));