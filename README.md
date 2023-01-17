# Drone

ドローンを用いて手の届かないところの掃除を行います

## 内容

+ 環境構築
+ Webアプリ起動

## 環境構築

### Node.jsのインストール

[こちら](https://nodejs.org/ja/)などからインストーラをダウンロードしてインストールする

### windows-build-toolsのインストール

+ Python2.7などNode.jsのライブラリに必要なものを全て用意してくれるコマンド

npm, git, python(2.7)コマンドを使えるターミナル( コマンドプロンプト)を用意する

```
npm install --global windows-build-tools
```

#### proxyエラーが起こった場合
+ プロキシ設定
```
npm -g config set proxy http://<server>:<port>/
npm -g config set https-proxy https://<server>:<port>/
npm -g config set registry http://registry.npmjs.org/
```
+ プロキシ削除
```
npm -g config delete proxy
npm -g config delete https-proxy
npm -g config delete registry
```
プロキシ設定・削除後、再度windows-build-toolsのインストールを行う

### node-rolling-spider のインストール

+ Parrot のミニドローンとBluetoothでやりとりできるモジュール

```
npm install rolling-spider
```

+ 黄色い文字で「WARN」がいくつか出てくると思いますが、たいてい大丈夫です
+ 赤い文字で「ERROR」の場合はネイティブコンパイル等に失敗しているので、windows-build-tools をインストールし直したり、エラーメッセージをもとに試行錯誤してください

### node-bluetooth-hci-socket のインストール

```
npm install bluetooth-hci-socket
```

### Bluetooth アダプタの設定

+ Bluetoothアダプタ（node-blutooth-hci-socket モジュールに適合するもの）をパソコンのUSBポートにさす
+ [Zadig](https://zadig.akeo.ie/)というドライバ書き換えツールをダウンロード
+ BluetoothアダプタをWinUSBに変更する

## Webアプリ起動

```
cd flight
npm start
```
コマンドに表示されたポート番号にアクセス