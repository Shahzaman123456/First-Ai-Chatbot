import { Button } from '#components/ui/button';
import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((response) => response.json())
         .then((data) => setMessage(data.message))
         .catch((error) => console.error('Error fetching message:', error));
   }, []);

   return (
      <>
         <div className="p-4">
            <h1 className="text-2xl text-red-600">My App</h1>
            <p>{message}</p>
            <Button>Click Me </Button>
         </div>
      </>
   );
};

export default App;
