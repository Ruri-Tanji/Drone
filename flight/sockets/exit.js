'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitEvent', function (exitUserName) {
        socket.broadcast.emit('reseiveExitEvent', exitUserName);
    });
};
