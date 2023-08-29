import React, { useState, useRef, useEffect } from 'react';
import staticAudio from './Audios/audiokushi.mp3';
import staticAudiotwo from './Audios/audioaradhya.mp3';
import './AudioDropdown.css';
import voicepitch from '../Assets/clonedimage.jpg';
import soundwaveone from '../Assets/soundwavethree.png';
import soundwavetwo from '../Assets/soundwavefour.jpg';
import ReactSelect from 'react-select';
import Select from 'react-select';

const AudioDropdown = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [showVoiceClonedSection, setShowVoiceClonedSection] = useState(false); // State to control the visibility of the "Voice getting cloned" section
  const [showOutputSection, setShowOutputSection] = useState(false); // State to control the visibility of the output section
  const inputAudioRef = useRef(null);
  const outputAudioRef = useRef(null);

  const handleAudioChange = (selectedOption) => {
    switch (selectedOption.value) {
      case 'audio1':
        setSelectedAudio(staticAudio);
        break;
      case 'staticAudio':
        setSelectedAudio(staticAudio);
        break;
      default:
        setSelectedAudio(null);
        break;
    }

    setIsOptionSelected(true);
  };

  const handleOutputAudioClick = () => {
    if (inputAudioRef.current) {
      inputAudioRef.current.pause();
    }
  };

  useEffect(() => {
    if (isOptionSelected) {
      // After 2 seconds, show the "Voice getting cloned" section
      const voiceCloneTimeout = setTimeout(() => {
        setShowVoiceClonedSection(true);
      }, 2000); // 2000 milliseconds = 2 seconds

      // Clear the timeout if a new option is selected before the timeout completes
      return () => clearTimeout(voiceCloneTimeout);
    } else {
      setShowVoiceClonedSection(false);
    }
  }, [isOptionSelected]);

  useEffect(() => {
    if (showVoiceClonedSection) {
      // After 2 seconds of showing the "Voice getting cloned" section, show the output section
      const outputTimeout = setTimeout(() => {
        setShowOutputSection(true);
      }, 4000); // 2000 milliseconds = 2 seconds
    } else {
      setShowOutputSection(false);
    }
  }, [showVoiceClonedSection]);

  const options = [
    { value: 'audio1', label: 'audio1' },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      color: state.isSelected ? 'white' : 'red',
      fontSize: '16px',
    }),
  };

  return (
    <>
      <div style={{ textAlign: "center", textTransform: "uppercase" }}>Voice cloning</div>
      <div className='flex-box-container'>
        <div className={`input-section ${isOptionSelected ? 'expanded' : ''}`}>
          <div style={{ textTransform: "uppercase" }}>Input section</div>
          <div className='input-flexbox-container'>
            <div className='input-inside-section'>
              <label htmlFor="audioSelect">Select an audio:</label>
              <Select options={options} styles={customStyles} onChange={handleAudioChange}  />
            </div>
            <div>
              {selectedAudio && (
                <audio
                  controls
                  src={selectedAudio}
                  ref={inputAudioRef}
                />
              )}
            </div>
          </div>
        </div>
        {showVoiceClonedSection && (
          <div className='voice-cloned-section'>
            <div className='voice-parent-div'>
              <div>Voice getting cloned</div>
              <div style={{ width: "100%", height: "200px", textAlign: "center" }}>
                <img src={soundwavetwo} alt="voice-pitch" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            </div>
          </div>
        )}
        {showOutputSection && (
          <div className='output-section'>
            <div style={{ textTransform: "uppercase" }}>Output section</div>
            <div className='output-section-flexbox-container'>
              <div onClick={handleOutputAudioClick}>Words  cloned into arigit singh voice</div>
              <div>
                <audio controls src={staticAudiotwo} ref={outputAudioRef} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioDropdown;
