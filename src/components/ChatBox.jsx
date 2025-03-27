import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { motion } from "framer-motion";

const ChatBox = ({ messages, transcript, listening }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (listening) {
    const words = transcript.split(" ");
  
    return (
      <div className="w-3/4 bg-white font-semibold h-full flex items-center justify-center pb-4">
        <div className="md:text-5xl text-3xl flex flex-wrap gap-2">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ color: "#959595" }}
              animate={{ color: "#333333" }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeInOut" }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  if (messages.length == 0) {
    return (
      <div className="w-3/4 bg-white font-semibold lg:mt-20 md:mt-16 mt-10">
        <h2 className="md:text-5xl text-3xl">
          こんにちは！
          <br />
          こちらはトヨタの社長です。何 <br />
          かご用件はございますか？
        </h2>
        <p className="md:text-base text-sm mt-6">私に聞いてみてください</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 pt-10 relative">
      {messages.map((msg, index) => (
        <Message key={index} message={msg.text} sender={msg.sender} />
      ))}
      <div ref={chatEndRef} />
      {/* Fade Effect */}
      <div className="sticky bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default ChatBox;
