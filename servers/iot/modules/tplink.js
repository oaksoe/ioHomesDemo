var { login } = require('tplink-cloud-api');
var uuidV4 = require('uuid/v4');
var constants = require('../helpers/constants');
 
var TPLINK_USER = process.env.TPLINK_USER;
var TPLINK_PASS = process.env.TPLINK_PASS;
var TPLINK_TERM = process.env.TPLINK_TERM || uuidV4();

var tplink;
var plugs;

exports.login = async () => {
    if (!tplink) {
        tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
        console.log('current auth token is', tplink.getToken());
    }
};

exports.getDevices = async () => {
    var devices = tplink ? await tplink.getDeviceList() : null;
    console.log(devices);
}

exports.initDevices = async (devices) => {
    if (tplink) {
        devices.forEach(async (device) => {
            if (device.type === constants.DEVICES.PLUG) {
                plugs[device.name] = await tplink.getHS100(device.name);
                console.log('deviceId = ', plugs[device.name].getDeviceId());
            }
        });
    }
}

exports.togglePlug = async (plugName) => {
    var plug = plugs[plugName];
    if (plug) {
        // var response = await plug.powerOn();
        // console.log("response=" + response );
        
        var response = await plug.toggle();
        console.log("plug toggle response =" + response);
    }
}

exports.getPlugInfo = async (plugName) => {
    var plug = plugs[plugName];
    if (plug) {
        response = await plug.getSysInfo();
        console.log("relay_state=" + response.relay_state);
        //console.log( JSON.parse(response).relay_state );
        
        console.log(await plug.getRelayState());
    }
}
