'use strict';

function connect() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendconnect', userName);
}

socket.on('receiveconnect', function (Name) {
    console.log('準備完了' + Name);
});

function takeoff() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendtakeoff', userName);
}

function land() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendland', userName);
}

function forward() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendforward', userName);
}


function backward() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendbackward', userName);
}

function up() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendup', userName);
}

function down() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('senddown', userName);
}

function turnRight() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendturnRight', userName);
}

function turnLeft() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendturnLeft', userName);
}

function right() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendright', userName);
}

function left() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    socket.emit('sendleft', userName);
}
