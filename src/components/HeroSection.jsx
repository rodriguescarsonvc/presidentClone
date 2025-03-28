import React, { useState } from "react";
import DotPattern from "./DotPattern";
import ChatInputBox from "./ChatInputBox";
import ChatBox from "./ChatBox";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { generateSpeech } from "../utils/api";

const HeroSection = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [messages, setMessages] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSpeechHandler = async (message) => {
    setIsLoading(true);
    setError(null);
    try {
      const { reply, blobUrl } = await generateSpeech(message);
      setAudioUrl(blobUrl);
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      const audio = new Audio(blobUrl);
      audio.play();
    } catch (err) {
        setError('Failed to generate speech. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

  const sendMessageHandler = (message) => setMessages((prev) => [...prev, { text: message, sender: "user" }]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <section className="flex-1 m-4 md:m-8 bg-white border border-[#EBEBEB] rounded-2xl relative overflow-hidden pb-4 md:pb-16 flex flex-col justify-between">
      <DotPattern cx={3} cy={3} cr={0.75} />
      <div className="space-y-2 overflow-y-auto scrollbar-hide flex-1 md:px-16 px-4 z-1 relative">
        <div className="max-w-5xl mx-auto h-full">
          <ChatBox messages={messages} listening={listening} transcript={transcript} isProcessing={isLoading} errorMessage={error}/>
        </div>
      </div>
      <div className="md:px-16 px-4 z-1 relative">
        <div className="max-w-5xl mx-auto">
          <ChatInputBox
            onSend={sendMessageHandler}
            transcript={transcript}
            listening={listening}
            speechRecognition={SpeechRecognition}
            messageCount={messages.length}
            resetTranscript={resetTranscript}
            isProcessing={isLoading}
            onGenerateSpeech={generateSpeechHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
