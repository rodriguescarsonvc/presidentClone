import { useState } from "react";
import { yellowCar, redCar, box, microphone, send } from "../assets/index";

const ChatInputBox = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col lg:gap-12 md:gap-8 gap-4 overflow-hidden md:py-6 py-4 bg-white border border-[#D6D6D6] rounded-2xl">
      {!input && (
        <div className="relative">
          <div className="overflow-x-scroll flex overflow-visible scrollbar-hide pr-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => setInput(suggestion.text)}
                className="flex items-center ml-4 gap-4 rounded-full px-6 py-3 bg-white hover:bg-neutral-100 border border-[#D6D6D6] transition-all hover:cursor-pointer whitespace-nowrap">
                <img src={suggestion.icon} alt="icon" className="w-6 h-6" />
                {suggestion.text}
              </div>
            ))}
          </div>

          {/* Fade Effect */}
          <div className="absolute top-0 right-0 w-20 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      )}
      <div className="flex items-end gap-4 px-6">
        <textarea
          className="flex-grow outline-none bg-white pr-3 py-2 text-base text-black placeholder-[#A6A6A6] resize-none overflow-y-auto max-h-40"
          placeholder="何でも聞いてください。"
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto"; // Reset height to calculate new height
            e.target.style.height = `${e.target.scrollHeight}px`; // Dynamic height adjustment
          }}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        />
        <button
          onClick={handleSend}
          className="rounded-full hover:bg-neutral-900 transition-all w-10 h-10 bg-black flex items-center justify-center text-white"
          aria-label="Send Message">
            {input ? <img src={send} alt="send" /> : <img src={microphone} alt="send" />}
          
        </button>
      </div>
    </div>
  );
};

const suggestions = [
  { text: "最新の注文状況を確認してください。", icon: box },
  { text: "最寄りのトヨタサービスセンターを探してください。", icon: yellowCar },
  { text: "最新のトヨタ車について教えてください。", icon: redCar },
];

export default ChatInputBox;
