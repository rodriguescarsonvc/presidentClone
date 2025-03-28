import { useState } from "react";
import {
  yellowCar,
  redCar,
  box,
  microphone,
  send,
  stop,
  confirmingLottie,
  listeningLottie,
} from "../assets/index";
import SoundWave from "./SoundWave";
import Lottie from "react-lottie-player";

const ChatInputBox = ({
  onSend,
  transcript,
  listening,
  speechRecognition,
  messageCount,
  resetTranscript,
  isProcessing,
  onGenerateSpeech,
  onStopProcessing,
  audio,
}) => {
  const [input, setInput] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleMessageSend = () => {
    if (audio) {
      audio.pause();
    }
    const message = input.trim();
    if (!message) return;
    onSend(message);
    setInput("");
    onGenerateSpeech(message);
  };

  const handleStopClick = () => {
    if (isProcessing) {
      console.log("Stopping processing...");
      onStopProcessing(); // Trigger cancellation when in processing state
    } else {
      stopListening(); // Existing logic for stopping listening
    }
  };

  const handleStartListening = () => {
    if (audio) {
      audio.pause();
    }
    speechRecognition.startListening({ continuous: true, language: "ja-JP" }); // language: "ja-JP"
  };

  const stopListening = () => {
    setConfirmation(true);
    setTimeout(() => {
      speechRecognition.stopListening();
      if (transcript.trim()) {
        onSend(transcript);
        onGenerateSpeech(transcript);
      }
      resetTranscript();
      setConfirmation(false);
    }, 700); // change to 700ms
  };

  if (listening || isProcessing) {
    return (
      <div className="flex flex-col items-center">
        {/* <SoundWave isListening={listening} /> */}
        <button
          onClick={handleStopClick}
          disabled={confirmation}
          className={`rounded-full transition-all lg:w-24 lg:h-24 w-20 h-20 flex items-center justify-center text-white lg:mt-10 mt-6 relative ${
            confirmation
              ? ""
              : "bg-[#333333]  shadow-[0px_14.4px_41.14px_rgba(0,0,0,0.12)]"
          }`}
          aria-label={input ? "Send Message" : "Start Listening"}>
          {confirmation ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Lottie
                loop
                animationData={confirmingLottie}
                play
                className="z-10 w-24 h-24"
              />
            </div>
          ) : isProcessing ? (
            <img
              src={stop}
              alt="send"
              className="w-6 h-6"
            />
          ) : (
            <Lottie
              loop
              animationData={listeningLottie}
              play
              className="z-10 w-24 h-24"
            />
          )}
        </button>
        <p className="text-[#A6A6A6] text-xs font-medium md:mt-6 mt-4">
          {confirmation
            ? "処理..."
            : isProcessing
            ? "処理を停止するにはここをタップしてください"
            : "聞き取りを停止するにはこのマイクをタップしてください"}
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
                className="flex items-center ml-4 gap-4 rounded-full md:pl-6 pl-4 pr-8 md:py-3 py-2 bg-white hover:bg-neutral-100 border border-[#D6D6D6] transition-all hover:cursor-pointer whitespace-nowrap md:text-sm text-sm">
                <img src={suggestion.icon} alt="icon" className="w-6 h-6" />
                {suggestion.text}
              </div>
            ))}
          </div>

          {/* Fade Effect */}
          <div className="absolute top-0 right-0 w-20 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      )}
      <div className="flex items-end gap-4 md:px-6 px-4">
        <textarea
          className="flex-grow outline-none bg-white pr-3 py-2 md:text-base text-sm text-black placeholder-[#A6A6A6] resize-none overflow-y-auto max-h-40"
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
          className="rounded-full hover:bg-neutral-900 transition-all w-10 h-10 bg-[#333333] flex items-center justify-center text-white"
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
