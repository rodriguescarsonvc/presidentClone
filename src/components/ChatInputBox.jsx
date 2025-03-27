import { useEffect, useState } from "react";
import { yellowCar, redCar, box, microphone, send } from "../assets/index";
/* import SoundWave from "./SoundWave"; */

const ChatInputBox = ({
  onSend,
  transcript,
  listening,
  speechRecognition,
  messageCount,
  resetTranscript,
}) => {
  const [input, setInput] = useState("");

  const handleMessageSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const handleStartListening = () => {
    speechRecognition.startListening({ continuous: true }); // language: "ja-JP"
  };

  const stopListening = () => {
    onSend(transcript);
    resetTranscript;
    speechRecognition.stopListening();
  };

/*   useEffect(() => {
    if (listening) {
      setInput(transcript); // Live update transcript in input field
    }
  }, [transcript, listening]); // Trigger updates whenever transcript changes */

  if (listening) {
    return (
      <div className="flex flex-col items-center">
        {/* <SoundWave isListening={listening}/> */}

        <button
          onClick={stopListening}
          className="rounded-full transition-all lg:w-24 lg:h-24 w-20 h-20 bg-black flex items-center justify-center text-white lg:mt-10 mt-6 border border-[#333333] shadow-[0px_14.4px_41.14px_rgba(0,0,0,0.12)]"
          aria-label={input ? "Send Message" : "Start Listening"}>
          <img src={microphone} alt="send" className="w-8 h-8 md:w-[38px] md:h-[38px]"/>
        </button>
        <p className="text-[#A6A6A6] text-xs font-articulate-medium md:mt-6 mt-4">
          Tap on this mic to stop listening
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:gap-12 md:gap-8 gap-4 overflow-hidden md:py-6 py-4 bg-white border border-[#D6D6D6] rounded-2xl">
      {!input && messageCount == 0 && (
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
          onClick={input.trim() ? handleMessageSend : handleStartListening}
          className="rounded-full hover:bg-neutral-900 transition-all w-10 h-10 bg-black flex items-center justify-center text-white"
          aria-label={input ? "Send Message" : "Start Listening"}>
          {input ? (
            <img src={send} alt="send" />
          ) : (
            <img src={microphone} alt="send" />
          )}
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
