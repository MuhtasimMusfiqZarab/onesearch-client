import React from 'react';
import { IconProps } from '../utils/interfaces';

export const UnlockIcon = ({ width, height, color }: IconProps): JSX.Element => {
  return (
    <svg width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.89285"
        y="13.1428"
        width="13"
        height="10.8571"
        rx="3"
        stroke="#039d69"
        strokeWidth="2"
      />
      <path
        d="M5.50333 11.5643C3.48303 9.94803 0.169724 5.98823 3.07896 3.07899C5.98821 0.169753 9.94802 3.48304 11.5643 5.50333"
        stroke="#039d69"
        strokeWidth="2"
      />
      <circle cx="8.60717" cy="18.9999" r="1" stroke="#039d69" strokeWidth="1.42857" />
    </svg>
  );
};
