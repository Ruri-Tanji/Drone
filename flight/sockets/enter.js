'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (enterUserName, enteruserPassword) {
        
        //sqlite3を使えるようにしている
        const sqlite3 = require("sqlite3");

        const db = new sqlite3.Database("./Users.db");

        //db.run("drop table if exists Users"); //データを保存するためコメントアウト。テーブルを消したければコメントアウト外す。
        
        console.log('db.js: ' + enterUserName);

        //テーブルの作成
        db.run("create table if not exists Users(id integer primary key autoincrement,name text, password text)");

        db.get(`select * from Users where name ='${enterUserName}'`, (err, row) => {
            //DB上に存在する場合
            console.log("select: ",row);
            if(row){
                socket.emit('selfReceiveEnterEvent');
            }
            // DBに存在しない場合は、DBに追加して入室可能
            else{
                console.log('存在しない');

                db.run("insert into Users(name,password) values(?,?)", enterUserName, enteruserPassword);
                
                socket.emit('selfReceiveEnterEvent');
            }
        });

        db.close();
    });

    socket.on('sendLoginUsers', function (userName) {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database("./Users.db");

        // ログインユーザの一覧を表示する
        db.all(`select * from Users`, (err, row) => {
            console.log(row);
            io.sockets.emit('receiveLoginUsers', row);
        });

        db.close();
    });
};
