const {constants, log} = require('utils-nxg-cg');
const msgbck = require('msgbroker-nxg-cg');
const {loging_elastic, objectLevels} = require('loging-elastic-cg-lib');

module.exports.process = async function processTrigger(msg, cfg, snapshot = {}) {
	try {
		log.info("Inside generateBug()");
        log.info("Msg=" + JSON.stringify(msg));
        log.info("Config=" + JSON.stringify(cfg));
        log.info("Snapshot=" + JSON.stringify(snapshot));
		
		//await msgbck.errorQueueListener();
		
		let {data} = msg;
		
		if (!data) {
            this.emit('error', `${constants.ERROR_PROPERTY} data`);
            throw new Error(`${constants.ERROR_PROPERTY} data`);
        }
		log.info("data", data);
		await loging_elastic(data, objectLevels.info);
		this.emit('data', {data});
		
		throw new Error("Testing error created..." + JSON.stringify(data));
		
		//this.emit('snapshot', snapshot);
        //log.info('Finished execution');
        //this.emit('end');
		
	} catch (e) {
        log.error(`ERROR: ${e}`);
        await loging_elastic(e, objectLevels.error);
        const emsg = e.toString();
        this.emit('error', e);
        await msgbck.producerErrorMessage(msg ,emsg);
        //throw new Error(e.toString());
    }
};