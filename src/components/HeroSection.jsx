import React, { useState } from "react";
import DotPattern from "./DotPattern";
import ChatInputBox from "./ChatInputBox";
import ChatBox from "./ChatBox";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { generateSpeech } from "../utils/api";
import axios from "axios";



const HeroSection = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [messages, setMessages] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);

  const generateSpeechHandler = async (message) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const { reply, blobUrl } = await generateSpeech(message);
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      const newAudio = new Audio(blobUrl);
      setAudio(newAudio);
      newAudio.play();
    } catch (err) {
      if (axios.isCancel(err)) {
        setError("Speech generation was canceled.");
      } else {
        setError("Failed to generate speech. Please try again.");
      }
    } finally {
        setIsLoading(false);
        setAbortController(null);
    }
};

  const handleStopProcessing = () => {
    setIsLoading(false);
    if (abortController) {
        abortController.abort(); // Cancel the request
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
            onStopProcessing={handleStopProcessing}
            audio={audio}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
