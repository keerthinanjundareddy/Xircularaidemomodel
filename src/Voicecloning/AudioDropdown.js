import React, { useState, useRef } from 'react';
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
  const [isOptionSelected, setIsOptionSelected] = useState(false); // New state
  const inputAudioRef = useRef(null);

  const handleAudioChange = (selectedOption) => {
    // Set the source based on the selected option
    switch (selectedOption.value) {
      case 'audio1':
        setSelectedAudio(staticAudio); // Update with the actual path
        break;
      case 'staticAudio':
        setSelectedAudio(staticAudio);
        break;
      default:
        setSelectedAudio(null); // No audio selected
        break;
    }

    setIsOptionSelected(true);
  };
  const handleOutputAudioClick = () => {
    // Pause the input audio when output audio is clicked
    if (inputAudioRef.current) {
      inputAudioRef.current.pause();
    }
  };
  const options = [
    // { value: 'option1', label: 'Option 1' },
    { value: 'audio1', label: 'audio1' },
    // Add more options as needed
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      color: state.isSelected ? 'white' : 'red',
      fontSize: '16px',
    }),
    // You can define other styles here as needed
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
                  // autoPlay={!!selectedAudio}
                  ref={inputAudioRef}
                />
              )}
            </div>
          </div>
        </div>
        <div className='voice-cloned-section'>
          <div className='voice-parent-div'>
            <div>Voice getting cloned</div>
            <div style={{ width: "100%", height: "200px", textAlign: "center" }}><img src={soundwavetwo} alt="voice-pitch" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
          </div>
        </div>
        <div className='output-section'>
          <div style={{ textTransform: "uppercase" }}>Output section</div>
          <div className='output-section-flexbox-container'>
            <div onClick={handleOutputAudioClick}>Words will be cloned into argit singh voice</div>
            <div>
              <audio controls src={staticAudiotwo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioDropdown;
