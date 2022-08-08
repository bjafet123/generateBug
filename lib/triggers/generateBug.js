const log = require('../../helpers/logger');
const msgbck = require('msgbrocker-nxg-cg');

const ERROR_PROPERTY = 'Error missing property';

module.exports.process = async function processTrigger(msg, cfg, snapshot = {}) {
	try {
		log.info("Inside generateBug()");
        log.info("Msg=" + JSON.stringify(msg));
        log.info("Config=" + JSON.stringify(cfg));
        log.info("Snapshot=" + JSON.stringify(snapshot));
		
		await msgbck.errorQueueListener();
		
		let {data} = msg;
		
		if (!data) {
            this.emit('error', `${ERROR_PROPERTY} data`);
            throw new Error(`${ERROR_PROPERTY} data`);
        }
		log.info("data", data);
		this.emit('data', {data});
		
		throw new Error("Testing error created..." + JSON.stringify(data));
		
		//this.emit('snapshot', snapshot);
        //log.info('Finished execution');
        //this.emit('end');
		
	} catch (e) {
        log.error(`ERROR: ${e}`);
        const emsg = e.toString();
        //const trace = {"error-message": emsg, "payload": msg}
        this.emit('error', e);
        await msgbck.producerErrorMessage(msg.toSring() ,emsg);
        //throw new Error(e.toString());
    }
};