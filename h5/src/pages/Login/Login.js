import React from "react";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import client from "../../client";

let userName;

const Login = () => {
  const history = useHistory();
  const submit = React.useCallback(() => {
    if (!userName) {
      alert("请输入昵称");
      return;
    }
    client.login(userName);
    history.push("/chat");
  }, [history]);

  return (
    <div className="container">
      <span>设置群聊显示的昵称</span>
      <input
        placeholder="请输入昵称..."
        onChange={(e) => (userName = e.target.value)}
      />
      <button onClick={submit}>提交</button>
    </div>
  );
};

export default Login;
