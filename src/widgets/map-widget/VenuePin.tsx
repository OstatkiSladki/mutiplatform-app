import React from 'react';

export const VenuePin = () => (
  <div style={{ cursor: 'pointer', transform: 'translate(-50%, -100%)' }}>
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z"
        fill="#fa7201"
      />
      <circle cx="16" cy="16" r="6" fill="white" />
    </svg>
  </div>
);
