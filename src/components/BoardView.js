'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../lib/api';
import TaskForm from './TaskForm';

const BoardView = ({ boardId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (boardId && boardId !== 'undefined') {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [boardId, refresh]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/boards/${boardId}/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleSaveTask = () => {
    setRefresh(prev => prev + 1);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_BASE}/api/boards/${boardId}/tasks/${taskId}`, { status: newStatus });
      handleSaveTask();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE}/api/boards/${boardId}/tasks/${taskId}`);
      handleSaveTask();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) return <div className="p-4">Loading tasks...</div>;

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Board Tasks </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Task
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        
        <div className="bg-gray-50 p-4 rounded w-80 min-w-[320px]">
          <h2 className="font-semibold mb-4 text-gray-700">Todo </h2>
          {todoTasks.map(task => (
            <div key={task._id} className="bg-white p-3 mb-3 rounded shadow border-l-4 border-blue-500">
              <h3 className="font-medium mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className={`font-medium ${getPriorityColor(task.priority)}`}>Priority: {task.priority}</span>
                {task.assignedTo && <span>👤 {task.assignedTo}</span>}
                {task.dueDate && <span>📅 {new Date(task.dueDate).toDateString()}</span>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateTaskStatus(task._id, 'inprogress')}
                  className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Move to In Progress
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="bg-gray-50 p-4 rounded w-80 min-w-[320px]">
          <h2 className="font-semibold mb-4 text-gray-700">In Progress</h2>
          {inProgressTasks.map(task => (
            <div key={task._id} className="bg-white p-3 mb-3 rounded shadow border-l-4 border-yellow-500">
              <h3 className="font-medium mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className={`font-medium ${getPriorityColor(task.priority)}`}>Priority: {task.priority}</span>
                {task.assignedTo && <span>👤 {task.assignedTo}</span>}
                {task.dueDate && <span>📅 {new Date(task.dueDate).toDateString()}</span>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateTaskStatus(task._id, 'done')}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                >
                  Move to Done
                </button>
                <button
                  onClick={() => updateTaskStatus(task._id, 'todo')}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Move to Todo
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div className="bg-gray-50 p-4 rounded w-80 min-w-[320px]">
          <h2 className="font-semibold mb-4 text-gray-700">Done</h2>
          {doneTasks.map(task => (
            <div key={task._id} className="bg-white p-3 mb-3 rounded shadow border-l-4 border-green-500">
              <h3 className="font-medium mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className={`font-medium ${getPriorityColor(task.priority)}`}>Priority: {task.priority}</span>
                {task.assignedTo && <span>👤 {task.assignedTo}</span>}
                {task.dueDate && <span>📅 {new Date(task.dueDate).toDateString()}</span>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateTaskStatus(task._id, 'inprogress')}
                  className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Move to In Progress
                </button>
                <button
                  onClick={() => setEditingTask(task)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {showForm && (
        <TaskForm
          boardId={boardId}
          onClose={() => setShowForm(false)}
          onSave={handleSaveTask}
        />
      )}

      {editingTask && (
        <TaskForm
          boardId={boardId}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default BoardView;
