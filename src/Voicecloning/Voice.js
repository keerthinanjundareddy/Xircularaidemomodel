import React, { useState } from 'react';
import AudioPlayer from './Audioplayer';

const Voice = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);

  const handleAudioChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedAudio(selectedOption);
  };

  return (
    <div>
      <label htmlFor="audioSelect">Select an audio:</label>
      <select id="audioSelect" onChange={handleAudioChange}>
        <option value="">Select</option>
        <option value="audio1.mp3">Audio 1</option>
        <option value="audio2.mp3">Audio 2</option>
      </select>
      {selectedAudio && <AudioPlayer selectedAudio={selectedAudio} />}
    </div>
  );
};

export default Voice;
