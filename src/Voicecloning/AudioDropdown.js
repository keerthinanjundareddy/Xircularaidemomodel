import React, { useState, useRef, useEffect } from 'react';
import staticAudio from './Audios/Background_Music_for_Presentations_and_Speeches(128k).m4a';
import staticAudiotwo from './Audios/Maroon_5_-_Memories_(Lyrics)(128k).m4a'
import './AudioDropdown.css';
import soundwavetwo from '../Assets/soundwavefour.jpg';
import Select from 'react-select';

const AudioDropdown = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [showVoiceClonedSection, setShowVoiceClonedSection] = useState(false);
  const [showOutputSection, setShowOutputSection] = useState(false);
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

  useEffect(() => {
    if (isOptionSelected) {
      const voiceCloneTimeout = setTimeout(() => {
        setShowVoiceClonedSection(true); // Show the voice cloned section after 2 seconds
      }, 2000);

      return () => {
        clearTimeout(voiceCloneTimeout);
      };
    }
  }, [isOptionSelected]);

  useEffect(() => {
    if (showVoiceClonedSection) {
      // After 2 seconds of showing the voice cloned section, display the output section
      const outputTimeout = setTimeout(() => {
        setShowVoiceClonedSection(false);
        setShowOutputSection(true);
      }, 6000);

      return () => clearTimeout(outputTimeout);
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
    <div >
      <div style={{ textAlign: "center", textTransform: "uppercase" }}>Voice cloning</div>
      <div className='flex-box-container'>
        {/* Always render the input section */}
        <div className={`input-section ${isOptionSelected ? 'expanded' : ''}`}>
          <div style={{ textTransform: "uppercase" }}>Input section</div>
          <div className='input-flexbox-container'>
            <div className='input-inside-section'>
              <label htmlFor="audioSelect">Select an audio:</label>
              <Select options={options} styles={customStyles} onChange={handleAudioChange} />
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

        {showOutputSection && (
          // Render the output section when showOutputSection is true
          <div className='output-section'>
            <div style={{ textTransform: "uppercase" }}>Output section</div>
            <div className='output-section-flexbox-container'>
              <div>Words cloned into arigit singh voice</div>
              <div>
                <audio controls src={staticAudiotwo} ref={outputAudioRef} />
              </div>
            </div>
          </div>
        )}

        {/* Conditionally render the voice cloned section based on showVoiceClonedSection */}
        {showVoiceClonedSection && (
          <div className='voice-cloned-section'>
            <div className='voice-parent-div'>
              <div style={{ textAlign: "center" }}>
                {showVoiceClonedSection ? (
                  <div className="loading-spinner">
                    <div style={{ color: "#007bff" }}>Audio getting cloned</div>
                    <div className="loader" style={{ marginTop: "10px" }}></div>
                    <div className="loading-text">Loading...</div>
                  </div>
                ) : (
                  <img src={soundwavetwo} alt="voice-pitch" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default AudioDropdown;
