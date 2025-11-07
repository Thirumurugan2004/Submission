import React from 'react';

function ArrayDetails({ items = [] }) {
  return (
    <div>
      <h3>Array Details</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>Value:</strong> 
            {/* Check if the item is an object */}
            {typeof item === 'object' && item !== null ? (
              <pre>{JSON.stringify(item)}</pre>  // Display object properties as a string
            ) : (
              item
            )}
            <br />
            <strong>Type:</strong> {typeof item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArrayDetails;
