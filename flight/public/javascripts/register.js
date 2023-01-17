'use strict';

function register() {
    // 入室メッセージをサーバに送信する
    // 入力されたユーザ名を取得する
    const place = $('#place').val();
    const act1 = $('#act1').val();
    const act2 = $('#act2').val();
    const act3 = $('#act3').val();
    const act4 = $('#act4').val();
    const act5 = $('#act5').val();
    const Name = $('#userName').val();

    // ユーザ名が未入力でないかチェックする
    if(act1 == ""){
        alert('動作を1つ以上入力してください');
    }else{
        socket.emit('sendRegisterEvent', Name, place, act1, act2, act3, act4, act5);
    }
    return false;
}

socket.on('ReceiveRegisterEvent', function (place) {
    console.log("receive");
    $('form').submit();
});

const Name = $('#userName').val();

// 入室メッセージイベントを送信する
socket.emit('sendCleanPlace', Name);
// ログインしているユーザ名を一覧表示する
socket.on('receiveCleanPlace', function (CleanPlace) {
    // 一旦消してから一覧を再び書く
    $('#CleanPlace').empty();
    for(let login of CleanPlace){
        const id = login.id;
        $('#CleanPlace').prepend(login.place+'<br>'+ '　' +'<br>');
        $('#CleanAct').prepend(login.act1+"　⇨　"+login.act2+"　⇨　"+login.act3+"　⇨　"+login.act4+"　⇨　"+login.act5 +'<br>'+ '　' +'<br>');
        $('#CleanTrash').prepend('<button class="sent_trash" type="button" value="削除" id="' + id + '" onclick="trash(this.id);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>'+'<br>'+ '　' +'<br>');
        $('#CleanStart').prepend('<button class="sent_start" type="button" value="実行" id="' + id + '" onclick="start(this.id);"></button>'+'<br>'+ '　' +'<br>');
    }
});

// 削除する
function trash(id){
    socket.emit('sendTrashMessage', id);
    return true;
}

socket.on('receiveTrashMessage', function (CleanPlace, id) {
    $('form').submit();
});

// 実行

function start(id){
    socket.emit('sendStartMessage', id);
}
socket.on('receiveStartMessage', function (row) {
    socket.emit('sendtakeoff', row);
});
socket.on('receivetakeoff', function (row) {
    const act = row.act1;
    const no = "1";
    if (act == '前'){
        socket.emit('sendforward', row, no);
    }else if (act == '後ろ'){
        socket.emit('sendbackward', row, no);
    }else if (act == '上'){
        socket.emit('sendup', row, no);
    }else if (act == '下'){
        socket.emit('senddown', row, no);
    }else if (act == '右旋回'){
        socket.emit('sendturnRight', row, no);
    }else if (act == '左旋回'){
        socket.emit('sendturnLeft', row, no);
    }else if (act == '右'){
        socket.emit('sendright', row, no);
    }else if (act == '左'){
        socket.emit('sendleft', row, no);
    }
});
socket.on('receiveone', function (row) {
    const act = row.act2;
    const no = "2";
    if (act == '前'){
        socket.emit('sendforward', row, no);
    }
    else if (act == '後ろ'){
        socket.emit('sendbackward', row, no);
    }
    else if (act == '上'){
        socket.emit('sendup', row, no);
    }
    else if (act == '下'){
        socket.emit('senddown', row, no);
    }
    else if (act == '右旋回'){
        socket.emit('sendturnRight', row, no);
    }
    else if (act == '左旋回'){
        socket.emit('sendturnLeft', row, no);
    }
    else if (act == '右'){
        socket.emit('sendright', row, no);
    }
    else if (act == '左'){
        socket.emit('sendleft', row, no);
    }
});
socket.on('receivetwo', function (row) {
    const act = row.act3;
    const no = "3";
    if (act == '前'){
        socket.emit('sendforward', row, no);
    }
    else if (act == '後ろ'){
        socket.emit('sendbackward', row, no);
    }
    else if (act == '上'){
        socket.emit('sendup', row, no);
    }
    else if (act == '下'){
        socket.emit('senddown', row, no);
    }
    else if (act == '右旋回'){
        socket.emit('sendturnRight', row, no);
    }
    else if (act == '左旋回'){
        socket.emit('sendturnLeft', row, no);
    }
    else if (act == '右'){
        socket.emit('sendright', row, no);
    }
    else if (act == '左'){
        socket.emit('sendleft', row, no);
    }
});
socket.on('receivethree', function (row) {
    const act = row.act4;
    const no = "4";
    if (act == '前'){
        socket.emit('sendforward', row, no);
    }
    else if (act == '後ろ'){
        socket.emit('sendbackward', row, no);
    }
    else if (act == '上'){
        socket.emit('sendup', row, no);
    }
    else if (act == '下'){
        socket.emit('senddown', row, no);
    }
    else if (act == '右旋回'){
        socket.emit('sendturnRight', row, no);
    }
    else if (act == '左旋回'){
        socket.emit('sendturnLeft', row, no);
    }
    else if (act == '右'){
        socket.emit('sendright', row, no);
    }
    else if (act == '左'){
        socket.emit('sendleft', row, no);
    }
});
socket.on('receivefour', function (row) {
    const act = row.act5;
    const no = "5";
    if (act == '前'){
        socket.emit('sendforward', row, no);
    }
    else if (act == '後ろ'){
        socket.emit('sendbackward', row, no);
    }
    else if (act == '上'){
        socket.emit('sendup', row, no);
    }
    else if (act == '下'){
        socket.emit('senddown', row, no);
    }
    else if (act == '右旋回'){
        socket.emit('sendturnRight', row, no);
    }
    else if (act == '左旋回'){
        socket.emit('sendturnLeft', row, no);
    }
    else if (act == '右'){
        socket.emit('sendright', row, no);
    }
    else if (act == '左'){
        socket.emit('sendleft', row, no);
    }
});
socket.on('receivefive', function (row) {
    socket.emit('sendland', row);
});