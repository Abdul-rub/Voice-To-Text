import React, { useState } from 'react';
import style from './VoiceToText.module.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from 'react-toastify';

const languages = [
  { name: 'English (India)', code: 'en-IN' },
  { name: 'Arabic (Egypt)', code: 'ar-EG' },
  { name: 'Bengali (Bangladesh)', code: 'bn-BD' },
  { name: 'Bulgarian (Bulgaria)', code: 'bg-BG' },
  { name: 'Catalan (Spain)', code: 'ca-ES' },
  { name: 'Chinese (Simplified, China)', code: 'zh-CN' },
  { name: 'Chinese (Traditional, Taiwan)', code: 'zh-TW' },
  { name: 'Croatian (Croatia)', code: 'hr-HR' },
  { name: 'Czech (Czech Republic)', code: 'cs-CZ' },
  { name: 'Danish (Denmark)', code: 'da-DK' },
  { name: 'Dutch (Netherlands)', code: 'nl-NL' },
  { name: 'English (Australia)', code: 'en-AU' },
  { name: 'English (Canada)', code: 'en-CA' },
  { name: 'English (UK)', code: 'en-GB' },
  { name: 'English (US)', code: 'en-US' },
  { name: 'Estonian (Estonia)', code: 'et-EE' },
  { name: 'Finnish (Finland)', code: 'fi-FI' },
  { name: 'French (Canada)', code: 'fr-CA' },
  { name: 'French (France)', code: 'fr-FR' },
  { name: 'German (Germany)', code: 'de-DE' },
  { name: 'Greek (Greece)', code: 'el-GR' },
  { name: 'Gujarati (India)', code: 'gu-IN' },
  { name: 'Hebrew (Israel)', code: 'he-IL' },
  { name: 'Hindi (India)', code: 'hi-IN' },
  { name: 'Hungarian (Hungary)', code: 'hu-HU' },
  { name: 'Icelandic (Iceland)', code: 'is-IS' },
  { name: 'Indonesian (Indonesia)', code: 'id-ID' },
  { name: 'Irish (Ireland)', code: 'ga-IE' },
  { name: 'Italian (Italy)', code: 'it-IT' },
  { name: 'Japanese (Japan)', code: 'ja-JP' },
  { name: 'Kannada (India)', code: 'kn-IN' },
  { name: 'Korean (South Korea)', code: 'ko-KR' },
  { name: 'Latvian (Latvia)', code: 'lv-LV' },
  { name: 'Lithuanian (Lithuania)', code: 'lt-LT' },
  { name: 'Malay (Malaysia)', code: 'ms-MY' },
  { name: 'Malayalam (India)', code: 'ml-IN' },
  { name: 'Marathi (India)', code: 'mr-IN' },
  { name: 'Norwegian (Norway)', code: 'no-NO' },
  { name: 'Persian (Iran)', code: 'fa-IR' },
  { name: 'Polish (Poland)', code: 'pl-PL' },
  { name: 'Portuguese (Brazil)', code: 'pt-BR' },
  { name: 'Portuguese (Portugal)', code: 'pt-PT' },
  { name: 'Punjabi (India)', code: 'pa-IN' },
  { name: 'Romanian (Romania)', code: 'ro-RO' },
  { name: 'Russian (Russia)', code: 'ru-RU' },
  { name: 'Serbian (Serbia)', code: 'sr-RS' },
  { name: 'Slovak (Slovakia)', code: 'sk-SK' },
  { name: 'Slovenian (Slovenia)', code: 'sl-SI' },
  { name: 'Spanish (Argentina)', code: 'es-AR' },
  { name: 'Spanish (Bolivia)', code: 'es-BO' },
  { name: 'Spanish (Chile)', code: 'es-CL' },
  { name: 'Spanish (Colombia)', code: 'es-CO' },
  { name: 'Spanish (Costa Rica)', code: 'es-CR' },
  { name: 'Spanish (Dominican Republic)', code: 'es-DO' },
  { name: 'Spanish (Ecuador)', code: 'es-EC' },
  { name: 'Spanish (El Salvador)', code: 'es-SV' },
  { name: 'Spanish (Guatemala)', code: 'es-GT' },
  { name: 'Spanish (Honduras)', code: 'es-HN' },
  { name: 'Spanish (Mexico)', code: 'es-MX' },
  { name: 'Spanish (Nicaragua)', code: 'es-NI' },
  { name: 'Spanish (Panama)', code: 'es-PA' },
  { name: 'Spanish (Paraguay)', code: 'es-PY' },
  { name: 'Spanish (Peru)', code: 'es-PE' },
  { name: 'Spanish (Puerto Rico)', code: 'es-PR' },
  { name: 'Spanish (Spain)', code: 'es-ES' },
  { name: 'Spanish (Uruguay)', code: 'es-UY' },
  { name: 'Spanish (Venezuela)', code: 'es-VE' },
  { name: 'Swahili (Kenya)', code: 'sw-KE' },
  { name: 'Swedish (Sweden)', code: 'sv-SE' },
  { name: 'Tamil (India)', code: 'ta-IN' },
  { name: 'Telugu (India)', code: 'te-IN' },
  { name: 'Thai (Thailand)', code: 'th-TH' },
  { name: 'Turkish (Turkey)', code: 'tr-TR' },
  { name: 'Ukrainian (Ukraine)', code: 'uk-UA' },
  { name: 'Urdu (Pakistan)', code: 'ur-PK' },
  { name: 'Vietnamese (Vietnam)', code: 'vi-VN' },
  { name: 'Welsh (United Kingdom)', code: 'cy-GB' },
  { name: 'Yiddish (World)', code: 'yi' },
  { name: 'Yoruba (Nigeria)', code: 'yo-NG' },
  { name: 'Zulu (South Africa)', code: 'zu-ZA' },
];

const VoiceToText = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].code); 
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();


  //Start Listening
  const startListening = () =>{
    toast.success("Started Listening")
    SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
  } 

  //Stop Listening 
  const stopListening = () =>{
    toast.error("Stopped Listening ")
    SpeechRecognition.stopListening();
  }


  //Copy to clickboard
  const copyToClipboard = () => {
    if (transcript) {
      toast.success("Copied to clipboard");
      navigator.clipboard.writeText(transcript);
    } else {
      // toast.success("Copied an empty space");
      navigator.clipboard.writeText(" ");
    }
  };


  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    const selectedLanguage = languages.find((language) => language.code === selectedValue);

    if (selectedLanguage) {
      setSelectedLanguage(selectedValue);
      toast.success(`Language changed to ${selectedLanguage.name}`);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className={style.container}>
      <h2>Speech to Text Converter</h2>
    


<div className={style.selectdiv}>

      <h4>Select a language : </h4>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
</div>

      <div className={style.mainContent}>
        {transcript}
      </div>

      <div className={style.btnStyle}>
        <button onClick={copyToClipboard}>Copy</button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default VoiceToText;
