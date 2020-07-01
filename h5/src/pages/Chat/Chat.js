import React from "react";
import "./Chat.scss";
import client from "../../client";

const MSG_TYPE = { NOTICE: "notice", SENDER: "sender", RECEIVER: "receiver" };

const Chat = () => {
  let inputRef = null;

  const [messages, setMessages] = React.useState([]);
  const [content, setContent] = React.useState("");

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
    setContent("");
  }, [content, messages]);
  return (
    <div className="container_chat">
      <ul className="content">
        {messages.map(
          ({ type, data: { userName, content: conten } }, index) => {
            return <li>{conten}</li>;
          }
        )}
      </ul>
      <div className="footer">
        <input
          placeholder="请输入..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={onSendPress}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
