import React, { useState, useRef, useEffect } from 'react';
import staticAudio from './Audios/audiokushi.mp3';
import './AudioDropdown.css';
import soundwavetwo from '../Assets/soundwavefour.jpg';
import ReactSelect from 'react-select';
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
      }, 5000);

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
      <div style={{ textAlign: "center", textTransform: "uppercase" }}>Voice cloning</div>
      <div className='flex-box-container'>
        {showOutputSection ? (
          // Render the output section when showOutputSection is true
          <div className='output-section'>
            <div style={{ textTransform: "uppercase" }}>Output section</div>
            <div className='output-section-flexbox-container'>
              <div>Words cloned into arigit singh voice</div>
              <div>
                <audio controls src={staticAudio} ref={outputAudioRef} />
              </div>
            </div>
          </div>
        ) : (
          // Render the input section when showOutputSection is false
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
        )}
        {/* Conditionally render the voice cloned section based on showVoiceClonedSection */}
        {showVoiceClonedSection && (
         <div className='voice-cloned-section'>
         <div className='voice-parent-div'>
           <div style={{ textAlign: "center" }}>
             {showVoiceClonedSection ? (
               <div className="loading-spinner">
                 <div className="loader"></div>
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
    </>
  );
};

export default AudioDropdown;
