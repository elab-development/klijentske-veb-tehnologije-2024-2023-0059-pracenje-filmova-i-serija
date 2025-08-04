// CircularRating.tsx
import React from 'react';

type CircularRatingProps = {
  value: number; // Expected between 0 and 10
};

export default function CircularRating({ value }: CircularRatingProps) {
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percentage = Math.min(Math.max(value, 0), 10) / 10;
  const strokeDashoffset = circumference - percentage * circumference;
  let color: string;

    if (value >= 7.5) {
        color = '#43DFD7';
    }
    else if (value >= 5) {
        color = '#59E62D';
    }
    else if (value >= 2.5) {
        color = '#DF9643';
    }
    else {
        color = '#DF4343';
    }

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#2b2b2b"
        fill="#121212"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fill="white"
        fontSize="20px"
        fontFamily="Arial"
      >
        {value.toFixed(1)}
      </text>
    </svg>
  );
}