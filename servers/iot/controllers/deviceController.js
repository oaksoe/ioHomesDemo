var tplink = require('../modules/tplink');
var constants = require('../helpers/constants');
var status = require('../helpers/status');

exports.toggle = async (device) => {
    try {
        if (device.type === constants.DEVICES.PLUG) {
            await tplink.togglePlug(device.name || 'ioHomes smart plug');
        }
    } catch(err) {
        await Promise.reject(new Error(status.DEVICE_ERROR.message));
    }
}