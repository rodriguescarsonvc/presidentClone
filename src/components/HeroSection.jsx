import React from "react";
import DotPattern from "./DotPattern";
import ChatInputBox from "./ChatInputBox";
import ChatBox from "./ChatBox";


const HeroSection = () => {
  const messages = [
    /* { text: "こんにちは！今日はどんなお手伝いができますか？", sender: "user" },
    { text: "予算の管理について教えてください。こんにちは！今日はどんなお手伝いができますか？", sender: "bot" }, */
  ];

  return (
    <section className="flex-1 m-4 md:m-8 bg-white border border-[#EBEBEB] rounded-2xl relative overflow-hidden pb-4 md:pb-16 flex flex-col justify-between">
      {/* <DotPattern cx={1} cy={1} cr={0.6} /> */}
      <DotPattern cx={3} cy={3} cr={0.75} />
        <div className="pb-4 space-y-2 overflow-y-auto flex-1 md:px-16 px-4 z-1 relative">
        <div className="max-w-5xl mx-auto">
          <ChatBox messages={messages}/>   
          </div>
        </div>
      <div className="md:px-16 px-4 z-1 relative">
        <div className="max-w-5xl mx-auto">
          <ChatInputBox onSend={(message) => console.log("Sent:", message)} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
