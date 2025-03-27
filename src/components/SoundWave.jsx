import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const SoundWave = ({ isListening }) => {
  const waveRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (!wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveRef.current,
        barWidth: 4,               // Pixelated bar width
        barGap: 2,                 // Spacing between bars
        barHeight: 1.5,            // Dynamic height based on audio
        waveColor: "transparent",  // Invisible wave (only dots)
        progressColor: "transparent",
        cursorColor: "transparent",
        backend: "MediaElement",
        responsive: true,
        height: 60,                // Wave height
        plugins: [],               // No extra plugins needed
      });
    }

    if (isListening) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);

        wavesurfer.current.loadDecodedBuffer(audioContext.createBuffer(1, 22050 * 2, 22050));
        wavesurfer.current.setFilters([source]);
        wavesurfer.current.play();
      });
    } else {
      wavesurfer.current.stop();
    }
  }, [isListening]);

  return (
    <div ref={waveRef} className="w-full h-[60px] relative">
      {/* Red dots overlay effect */}
      <div className="absolute inset-0 grid grid-cols-60 gap-1">
        {Array.from({ length: 60 * 10 }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-red-500 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default SoundWave;
