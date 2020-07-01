import io from "socket.io-client";

const client = {
  _socket: null,
  userId: Date.now(),
  userName: "",
  init: function () {
    this._socket = io("http://192.168.1.101:3001", {
      transports: ["websocket"], // you need to explicitly tell it to use websockets
      forceNew: false,
    });
    this._socket.on("connect", function () {
      // console.warn('connected!');
    });
    this._socket.on("message", (data) => {
      // console.warn('message', data);
    });
  },
  login: function (userName) {
    if (!this._socket || !this._socket.connected) {
      return;
    }
    this.userName = userName;
    this._socket.emit("login", {
      userId: this.userId,
      userName: this.userName,
    });
  },
  logout: function () {
    if (!this._socket || !this._socket.connected) {
      return;
    }
    this._socket.disconnect();
  },
  onJoin: function () {
    return new Promise((resolve, reject) => {
      if (!this._socket || !this._socket.connected) {
        reject();
      }
      this._socket.on("join", (msg) => {
        Object.assign(msg, { content: `${msg.userName}加入了群聊` });
        resolve(msg);
      });
    });
  },
  onLeave: function () {
    return new Promise((resolve, reject) => {
      if (!this._socket || !this._socket.connected) {
        reject();
      }
      this._socket.on("leave", (msg) => {
        Object.assign(msg, { content: `${msg.userName}退出了群聊` });
        resolve(msg);
      });
    });
  },
  onMessage: function () {
    return new Promise((resolve, reject) => {
      if (!this._socket || !this._socket.connected) {
        reject();
      }
      this._socket.on("message", (msg) => {
        if (this.userId === msg.userId) {
          return;
        }
        resolve(msg);
      });
    });
  },
  send: function (msg) {
    if (!this._socket || !this._socket.connected) {
      return;
    }
    this._socket.emit("message", msg);
  },
};

client.init();

export default client;
