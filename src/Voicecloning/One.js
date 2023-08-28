import React from 'react'
// Define the data you want to send in the request body (if needed)
const requestData = {
    // Your data goes here
  };
  
  // Define the URL and request options
  const apiUrl = '/llmchain.chain/run'; // Relative URL
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the appropriate content type
      // Add any other headers if required
    },
    body: JSON.stringify(requestData), // Convert data to JSON format if needed
  };
  
  // Make the POST request
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Process the response data here
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
function One() {
  return (
    <div>
      hiii
    </div>
  )
}

export default One
