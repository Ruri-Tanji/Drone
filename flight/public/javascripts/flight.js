'use strict';
//接続
function connect() {
    socket.emit('sendconnect');
}
//離陸
function takeoff() {
    socket.emit('sendtakeoff');
}
//着陸
function land() {
    socket.emit('sendland');
}
//前進
function forward() {
    socket.emit('sendforward');
}
//後退
function backward() {
    socket.emit('sendbackward');
}
//上昇
function up() {
    socket.emit('sendup');
}
//下降
function down() {
    socket.emit('senddown');
}
//右旋回
function turnRight() {
    socket.emit('sendturnRight');
}
//左旋回
function turnLeft() {
    socket.emit('sendturnLeft');
}
//右
function right() {
    socket.emit('sendright');
}
//左
function left() {
    socket.emit('sendleft');
}
