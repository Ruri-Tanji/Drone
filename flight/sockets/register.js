'use strict';

// モジュールの読み込み
const Drone = require('rolling-spider'); // rolling-spider モジュールを使う

// 変数の設定
let ACTIVE = true; // ドローンがアクティブ状態か否か
const STEPS = 8; // 一度のキー操作で命令を出す回数（動かすステップ数、0-100）

// rolling-spider のインスタンスを作る
const d = new Drone();

function cooldown() {
    ACTIVE = false;       // いったん ACTIVE 状態でなくしておいて
    setTimeout( () => {   // 一定時間後に
      ACTIVE = true;      // ACTIVE に戻す
    }, STEPS * 1000);       // この例では 24 ms
}

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendRegisterEvent', function (userName, place, act1, act2, act3, act4, act5) {

        //sqlite3を使えるようにしている
        const sqlite3 = require("sqlite3");

        //データベースを操作するためのインスタンス的なやつを生成している?
        //引数は使用するデータベースファイルだと思う。ここで使用されているのはhackathon/chatapp/Publish.db
        const db = new sqlite3.Database("./Place.db");

        //データを保存するためコメントアウト。テーブルを消したければコメントアウト外す。
        //db.run("drop table if exists Place");

        //テーブルの作成
        db.run("create table if not exists Place(id integer primary key autoincrement, userName, place, act1, act2, act3, act4, act5)");

        //入力されたユーザーネーム、メッセージ、時間をデータベースに保存。
        db.run("insert into Place(userName, place, act1, act2, act3, act4, act5) values(?,?,?,?,?,?,?)", userName, place, act1, act2, act3, act4, act5);

        //データベースに保存されているデータの出力
        db.each("select * from Place", (err, row) => {
            console.log(`${row.userName}`, `${row.place}`, `${row.act1}`, `${row.act2}`, `${row.act3}`, `${row.act4}`, `${row.act5}`);
            socket.emit('ReceiveRegisterEvent', row );
        });
        
        db.close();
    });

    socket.on('sendCleanPlace', function (userName) {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database("./Place.db");
        const name = userName;

        // ユーザー名が一致する掃除ルートの一覧を表示する
        db.all(`select * from Place WHERE userName ='${name}'`, (err, row) => {
            console.log(row);
            io.sockets.emit('receiveCleanPlace', row);
        });

        db.close();
    });

    // 投稿メッセージを消す
    socket.on('sendTrashMessage', function (id) {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database("./Place.db");
        const deleteid = id;

        db.run(`DELETE FROM Place WHERE id ='${deleteid}'`, err => {
            if (err) {
                return console.error(err.message);
            }
        });

        // ログインユーザの一覧を表示する
        db.all(`select * from Place`, (err, row) => {
            io.sockets.emit('receiveTrashMessage', row, id);
        });

        db.close();
    });

    // 実行
    socket.on('sendStartMessage', function (id) {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database("./Place.db");
        const startid = id;

        db.get(`select * from Place where id ='${startid}'`, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('startouto');
            d.connect(() => { // BLE でドローンに接続し、接続できたらコールバック
                d.setup(() => { // ドローンを初期設定してサービスや特徴を取得、その後コールバック
                    d.flatTrim(); // トリムをリセット
                    d.startPing();
                    d.flatTrim();
                    ACTIVE = true; // ドローンを ACTIVE 状態とする
                    console.log(d.name, 'is ready!'); // 準備OKなことをコンソール出力
                    io.sockets.emit('receiveStartMessage', row, id);
                });
    
                if (ACTIVE) {
                    //離陸
                    socket.on('sendtakeoff', function (row) {
                        console.log("takeoff");
                        d.takeOff();
                        setTimeout( () => {   // 一定時間後に
                            io.sockets.emit('receivetakeoff', row);
                        }, 2500);
                    });
                    //着陸
                    socket.on('sendland', function (row) {
                        console.log("land");
                        d.land();
                        ACTIVE = false;
                        io.sockets.emit('receiveTrashMessage', row, row);
                    });
                    //前進
                    socket.on('sendforward', function (row, no) {
                        console.log("formard");
                        d.forward({ steps: 12 });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //後退
                    socket.on('sendbackward', function (row, no) {
                        console.log("backward");
                        d.backward({ steps: STEPS });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //上昇
                    socket.on('sendup', function (row, no) {
                        console.log("up");
                        d.up({ steps: STEPS });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //下降
                    socket.on('senddown', function (row, no) {
                        console.log("down");
                        cooldown();
                        d.down({ steps: STEPS });
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //右旋回
                    socket.on('sendturnRight', function (row, no) {
                        console.log("turnRight");
                        d.turnRight({ steps: STEPS });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //左旋回
                    socket.on('sendturnLeft', function (row, no) {
                        console.log("turnLeft");
                        d.turnLeft({ steps: STEPS });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //右
                    socket.on('sendright', function (row, no) {
                        console.log("right");
                        d.tiltRight({ steps: STEPS });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                    //左
                    socket.on('sendleft', function (row, no) {
                        console.log("left");
                        d.tiltLeft({ steps: STEPS });
                        cooldown();
                        if (no == "1"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receiveone', row);
                            }, 2500);
                        }
                        else if (no == "2"){                           
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivetwo', row);
                            }, 2500);
                        }
                        else if (no == "3"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivethree', row);
                            }, 2500);
                        }
                        else if (no == "4"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefour', row);
                            }, 2500);
                        }
                        else if (no == "5"){
                            setTimeout( () => {   // 一定時間後に
                                io.sockets.emit('receivefive', row);
                            }, 2500);
                        }
                    });
                }
            });

        });

        db.close();
    });
};
