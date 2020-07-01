import React from "react";
import "./Chat.css";
import client from "../../client";

const MSG_TYPE = { NOTICE: "notice", SENDER: "sender", RECEIVER: "receiver" };

const Chat = () => {
  let inputRef = null;
  let content = "";

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    client
      .onJoin()
      .then((msg) => {
        const item = { type: MSG_TYPE.NOTICE, data: msg };
        setMessages([].concat(messages).concat([item]));
      })
      .catch(() => {});
    client
      .onLeave()
      .then((msg) => {
        const item = { type: MSG_TYPE.NOTICE, data: msg };
        setMessages([].concat(messages).concat([item]));
      })
      .catch(() => {});
    client
      .onMessage()
      .then((msg) => {
        const item = { type: MSG_TYPE.RECEIVER, data: msg };
        setMessages([].concat(messages).concat([item]));
      })
      .catch(() => {});
  }, [messages]);

  const onSendPress = React.useCallback(() => {
    if (!content) {
      alert("请输入内容");
      return;
    }
    const data = {
      userId: client.userId,
      userName: client.userName,
      content,
    };
    client.send(data);
    const msg = {
      type: MSG_TYPE.SENDER,
      data,
    };
    setMessages([].concat(messages).concat([msg]));
    inputRef && inputRef.value("");
  }, [content, inputRef, messages]);
  return (
    <div className="container">
      <ul className="content">
        {messages.map(
          ({ type, data: { userName, content: conten } }, index) => {
            return <li>{conten}</li>;
          }
        )}
      </ul>
      <div className="footer">
        <input
          ref={(ref) => (inputRef = ref)}
          placeholder="请输入..."
          onChange={(e) => (content = e.target.value)}
        />
        <button type="button" onChange={onSendPress}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
