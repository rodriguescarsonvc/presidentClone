import Lottie from "react-lottie-player";
import { chatThinking } from "../assets";

const Message = ({ message, sender, isThinking }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="max-w-[75%] md:py-4 py-3 md:px-6 px-4 rounded-t-2xl rounded-bl-2xl md:text-base backdrop-blur-sm bg-[#F2F2F2] text-[#333333] text-sm">
          {message}
        </div>
      ) : isThinking ? (
        <div className="md:text-2xl text-base font-semibold max-w-[75%] relative h-16 w-16">
          <Lottie
            loop
            animationData={chatThinking}
            play
            className="z-10"
          />
        </div>
      ) : (
        <div className="md:text-2xl text-base font-semibold max-w-[75%]">
          {message}
        </div>
      )}
    </div>
  );
};

export default Message;
