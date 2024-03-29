'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);    
    response.render('room', {userName: request.body.userName});
    
});

router.post('/auto', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);    
    response.render('auto', {userName: request.body.userName});
});

router.post('/self', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);    
    response.render('self', {userName: request.body.userName});
    
});

module.exports = router;