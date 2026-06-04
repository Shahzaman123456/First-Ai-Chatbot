import React from 'react'
import { useState,useEffect } from 'react'

const App = () => {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <p>{message}</p>
    </div>
  )
}

export default App