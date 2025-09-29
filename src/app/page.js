 
'use client';

import { useState } from 'react';
import CreateBoard from '../components/CreateBoard';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleBoardCreated = () => {
    setRefresh(prev => prev + 1);  
  };

  return (
    <div className="p-4">
      

      <h1 className="text-5xl font-bold mb-4 text-blue-400">Welcome to Asana Clone</h1>
      <CreateBoard onBoardCreated={handleBoardCreated} />
    </div>
  );
}
