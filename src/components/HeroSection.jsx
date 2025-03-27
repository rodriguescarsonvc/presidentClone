import React, { useState } from "react";
import DotPattern from "./DotPattern";
import ChatInputBox from "./ChatInputBox";
import ChatBox from "./ChatBox";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const HeroSection = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [messages, setMessages] = useState([
    /* { text: "こんにちは！今日はどんなお手伝いができますか？", sender: "user" },
    { text: "予算の管理について教えてください。こんにちは！今日はどんなお手伝いができますか？", sender: "bot" },
    { text: "こんにちは！今日はどんなお手伝いができますか？", sender: "user" },
    { text: "予算の管理について教えてください。こんにちは！今日はどんなお手伝いができますか？", sender: "bot" },
    { text: "こんにちは！今日はどんなお手伝いができますか？", sender: "user" },
    { text: "予算の管理について教えてください。こんにちは！今日はどんなお手伝いができますか？", sender: "bot" },
    { text: "こんにちは！今日はどんなお手伝いができますか？", sender: "user" },
    { text: "予算の管理について教えてください。こんにちは！今日はどんなお手伝いができますか？ggg", sender: "bot" }, */
  ]);

  const handleSendMessage = (message) => {
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <section className="flex-1 m-4 md:m-8 bg-white border border-[#EBEBEB] rounded-2xl relative overflow-hidden pb-4 md:pb-16 flex flex-col justify-between">
      {/* <DotPattern cx={1} cy={1} cr={0.6} /> */}
      <DotPattern cx={3} cy={3} cr={0.75} />
      <div className="space-y-2 overflow-y-auto scrollbar-hide flex-1 md:px-16 px-4 z-1 relative">
        <div className="max-w-5xl mx-auto h-full">
          <ChatBox messages={messages} listening={listening} transcript={transcript}/>
        </div>
      </div>
      <div className="md:px-16 px-4 z-1 relative">
        <div className="max-w-5xl mx-auto">
          <ChatInputBox
            onSend={handleSendMessage}
            transcript={transcript}
            listening={listening}
            speechRecognition={SpeechRecognition}
            messageCount={messages.length}
            resetTranscript={resetTranscript}
          />
        </div>
      </div>
      {/* <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() =>
            SpeechRecognition.startListening({ continuous: true })
          }>
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div> */}
    </section>
  );
};

export default HeroSection;
