'use client'

import { useState } from 'react';

function AddFieldButton() {
  const [message, setMessage] = useState('');

  const addField = async () => {
    try {
      const response = await fetch('/api/addfield', {
        method: 'POST',
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error adding field');
    }
  };

  return (
    <div>
      <button onClick={addField}>Add Discount Field to All Products</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddFieldButton;