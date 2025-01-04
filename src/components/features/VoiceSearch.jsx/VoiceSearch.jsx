import { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceSearch = () => {
  const [voiceInput, setVoiceInput] = useState("");
  const [silenceTimeout, setSilenceTimeout] = useState(null);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    resetSilenceTimer();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    clearTimeout(silenceTimeout);
  };

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimeout);
    setSilenceTimeout(
      setTimeout(() => {
        SpeechRecognition.stopListening();
        console.log("Stopped due to silence");
      }, 5000)
    );
  };

  useEffect(() => {
    if (transcript) {
      setVoiceInput(transcript);
      resetSilenceTimer();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser do not support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    console.error("Microphone is not available");
    return <span>Microphone is not available.</span>;
  }

  return {
    listening,
    startListening,
    stopListening,
    voiceInput,
  };
};

export default VoiceSearch;
