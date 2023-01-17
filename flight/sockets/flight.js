'use strict';

const Drone = require('rolling-spider');
const d = new Drone();
const STEPS = 8;

module.exports = function (socket, io) {
    socket.on('sendconnect', function () {
        d.connect(() => { 
            d.setup(() => { 
                d.flatTrim(); 
                d.startPing();
                d.flatTrim();
                console.log(d.name, 'is ready!');
            });
            //離陸
            socket.on('sendtakeoff', function () {
                d.takeOff();
            });
            //着陸
            socket.on('sendland', function () {
                d.land();
            });
            //前進
            socket.on('sendforward', function () {
                d.forward({ steps: STEPS });
            });
            //後退
            socket.on('sendbackward', function () {
                d.backward({ steps: STEPS });
            });
            //上昇
            socket.on('sendup', function () {
                d.up({ steps: STEPS });
            });
            //下降
            socket.on('senddown', function () {
                d.down({ steps: STEPS });
            });
            //右旋回
            socket.on('sendturnRight', function () {
                d.turnRight({ steps: STEPS });
            });
            //左旋回
            socket.on('sendturnLeft', function () {
                d.turnLeft({ steps: STEPS });
            });
            //右
            socket.on('sendright', function () {
                d.tiltRight({ steps: STEPS });
            });
            //左
            socket.on('sendleft', function () {
                d.tiltLeft({ steps: STEPS });
            });
            
        });
    });
};


