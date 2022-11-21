'use strict';

// モジュールの読み込み
const Drone = require('rolling-spider'); // rolling-spider モジュールを使う

// 変数の設定
let ACTIVE = true; // ドローンがアクティブ状態か否か
const STEPS = 5; // 一度のキー操作で命令を出す回数（動かすステップ数、0-100）

// rolling-spider のインスタンスを作る
const d = new Drone();

function cooldown() {
    ACTIVE = false;       // いったん ACTIVE 状態でなくしておいて
    setTimeout( () => {   // 一定時間後に
      ACTIVE = true;      // ACTIVE に戻す
    }, STEPS * 12);       // この例では 24 ms
}

module.exports = function (socket, io) {
    // 離陸メッセージ送信
    socket.on('sendconnect', function (Name) {

        console.log('start');

        // ドローンの初期設定
        d.connect(() => { // BLE でドローンに接続し、接続できたらコールバック
            d.setup(() => { // ドローンを初期設定してサービスや特徴を取得、その後コールバック
                d.flatTrim(); // トリムをリセット
                d.startPing();
                d.flatTrim();
                ACTIVE = true; // ドローンを ACTIVE 状態とする
                console.log(d.name, 'is ready!'); // 準備OKなことをコンソール出力
                io.sockets.emit('receiveconnect', Name);
            });

            if (ACTIVE) {
                //離陸
                socket.on('sendtakeoff', function (Name) {
                    d.takeOff();
                });
                //着陸
                socket.on('sendland', function (Name) {
                    d.land();
                });
                //前進
                socket.on('sendforward', function (Name) {
                    d.forward({ steps: STEPS });
                    cooldown(); 
                });
                //後退
                socket.on('sendbackward', function (Name) {
                    d.backward({ steps: STEPS });
                    cooldown();
                });
                //上昇
                socket.on('sendup', function (Name) {
                    d.up({ steps: STEPS });
                    cooldown();
                });
                //下降
                socket.on('senddown', function (Name) {
                    d.down({ steps: STEPS });
                    cooldown();
                });
                //右旋回
                socket.on('sendturnRight', function (Name) {
                    d.turnRight({ steps: STEPS });
                    cooldown();
                });
                //左旋回
                socket.on('sendturnLeft', function (Name) {
                    d.turnLeft({ steps: STEPS });
                    cooldown();
                });
                //右
                socket.on('sendright', function (Name) {
                    d.tiltRight({ steps: STEPS });
                    cooldown();
                });
                //左
                socket.on('sendleft', function (Name) {
                    d.tiltLeft({ steps: STEPS });
                    cooldown();
                });
            }
        });
    });
};
