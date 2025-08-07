import { useState, useEffect, useRef } from 'react';

type CircularRatingProps = {
  value: number; // Expected between 0 and 10
};

export default function CircularRating({ value }: CircularRatingProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  
  const radius = 30;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const targetValue = Math.min(Math.max(value, 0), 10);
  const targetPercentage = targetValue / 10;
  const strokeDashoffset = circumference - animatedPercentage * circumference;
  
  const getColor = (val: number): string => {
    if (val >= 7.5) return '#43DFD7';
    if (val >= 5) return '#59E62D';
    if (val >= 2.5) return '#DF9643';
    return '#DF4343';
  };
  
  const color = getColor(value);

  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  useEffect(() => {
    const duration = 800;
    
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutQuart(progress);
      
      const currentAnimatedValue = easedProgress * targetValue;
      const currentAnimatedPercentage = easedProgress * targetPercentage;
      
      setAnimatedValue(currentAnimatedValue);
      setAnimatedPercentage(currentAnimatedPercentage);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(targetValue);
        setAnimatedPercentage(targetPercentage);
        startTimeRef.current = 0;
      }
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = 0;
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, targetPercentage]);

  return (
    <svg 
      height={radius * 2} 
      width={radius * 2} 
      style={{ 
        boxShadow: `-5px 5px 30px ${color}`,
        transform: 'translateZ(0)',
        willChange: 'auto'
      }}
    >
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
        style={{ 
          strokeDashoffset,
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        x="50%"
        y="50%"
        dy=".35em"
        textAnchor="middle"
        fill="white"
        fontSize="18px"
        fontFamily="Space Grotesk"
      >
        {animatedValue.toFixed(1)}
      </text>
    </svg>
  );
}