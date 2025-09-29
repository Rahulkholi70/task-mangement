'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Sidebar = () => {
  const [boards, setBoards] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchBoards();
    fetchCompletedTasks();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/boards');
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/boards/tasks?status=done');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  const handleBoardClick = (boardId) => {
    router.push(`/boards/${boardId}`);
  };

  const handleTaskClick = (boardId) => {
    router.push(`/boards/${boardId}`);
  };

  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Boards</h2>
      <ul>
        {boards.map(board => (
          <li
            key={board._id}
            className="mb-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => handleBoardClick(board._id)}
          >
            <h3 className="font-medium">{board.name}</h3>
            <p className="text-sm text-gray-600">{board.description}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mb-4 mt-6">Completed Tasks</h2>
      <ul>
        {completedTasks.map(task => (
          <li
            key={task._id}
            className="mb-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => handleTaskClick(task.boardId)}
          >
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
