'use strict';

function enter() {
    // 入室メッセージをサーバに送信する
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    const userPassword = $('#userPassword').val();

    // ユーザ名が未入力でないかチェックする
    if(userName == ""){
        alert('ユーザー名を入力してください');
    }
    else if(userPassword == ""){
        alert('パスワードを入力してください');
    }else{
        socket.emit('sendEnterEvent', userName, userPassword);
    }
}

// 入室する
socket.on('selfReceiveEnterEvent', function () {
    $('form').submit();
});

// ページを更新するたびに行うイベント

// 入力されたユーザ名を取得する
const userName = $('#userName').val();
// 入室メッセージイベントを送信する