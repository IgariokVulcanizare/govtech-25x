'use client';

import { useEffect, useState } from 'react';

const colors = [
  '#26C5F3',
  '#3EABF4',
  '#4E2C70',
  '#5591F5',
  '#6D77F6',
  '#702B9E',
  '#855DF7',
  '#9C43F8',
  '#B429F9'
];

type Circle = {
  top: string;
  left: string;
  size: number;
  color: string;
};

export default function Signup() {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const generateCircles = () => {
      const gridSize = 3; // 3x3 grid
      const spacing = 25; // Percentage spacing between circles
      const newCircles: Circle[] = [];

      // Create positions in a grid
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          // Calculate position with spacing
          const top = (row * (100 / (gridSize - 1))) + (Math.random() * spacing - spacing/2);
          const left = (col * (100 / (gridSize - 1))) + (Math.random() * spacing - spacing/2);
          
          // Ensure positions stay within bounds
          const boundedTop = Math.max(0, Math.min(100, top));
          const boundedLeft = Math.max(0, Math.min(100, left));

          newCircles.push({
            top: `${boundedTop}%`,
            left: `${boundedLeft}%`,
            size: Math.floor(Math.random() * 300) + 200, // Random size between 200 and 500
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-30 blur-2xl"
          style={{
            top: circle.top,
            left: circle.left,
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
} 