'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { CreateTripRequest } from '../types/api';

export default function CreateTrip() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateTripRequest>({
    name: '',
    goal_amount: 0,
    max_participants: 2,
    details: '',
    deadline: new Date().toISOString().split('T')[0]
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'goal_amount' || name === 'max_participants' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll generate a random trip code and redirect
    // In a real app, this would be an API call to create the trip
    const randomCode = Math.random().toString(36).substring(2, 8);
    router.push(`/trip/${randomCode}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Create a New Trip</h2>
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">Trip Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="goal_amount" className="block text-sm font-medium mb-2">Fundraising Goal ($)</label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
              id="goal_amount"
              name="goal_amount"
              value={formData.goal_amount || ''}
              onChange={handleChange}
              min="1"
              step="0.01"
              required 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="max_participants" className="block text-sm font-medium mb-2">Number of People</label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
              id="max_participants"
              name="max_participants"
              value={formData.max_participants || ''}
              onChange={handleChange}
              min="2"
              required 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium mb-2">Trip Details</label>
            <textarea 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={5}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium mb-2">Fundraising Deadline</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
} 