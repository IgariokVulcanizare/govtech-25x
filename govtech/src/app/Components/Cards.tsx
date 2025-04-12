import React from 'react';

interface CardProps {
    title: string;
    // icon: string;
    // link: string;
  }

  function Card({ title /*icon, link*/ }: CardProps) {
    return (
      <div className="w-[300px] p-4 bg-white rounded-xl border shadow-sm flex flex-col items-center justify-between text-center">
        <h2 className="text-lg font-medium mb-2 text-left">{title}</h2>
        
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-full py-4 rounded-[8] transition shadow-lg">
            Click aici
          </button>
      </div>
    );
  }

  export default Card;