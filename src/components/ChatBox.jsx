import React from "react";
import Message from "./Message";

const ChatBox = ({ messages }) => {

    if (messages.length == 0) {
        return <div className="w-3/4 bg-white font-semibold lg:mt-20 md:mt-16 mt-10">
            <h2 className="text-5xl">こんにちは！<br/>こちらはトヨタの社長です。何 <br/>かご用件はございますか？</h2>
            <p className="text-base mt-6">私に聞いてみてください</p>
        </div>;
    }
  return (
    <>
      {messages.map((msg, index) => (
        <Message key={index} message={msg.text} sender={msg.sender} />
      ))}
    </>
  );
};

export default ChatBox;
