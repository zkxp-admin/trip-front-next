'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { JoinTripRequest } from '../types/api';

export default function Join() {
  const router = useRouter();
  const [formData, setFormData] = useState<JoinTripRequest>({
    code: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ code: e.target.value });
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.code) {
      router.push(`/trip/${formData.code}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Join a Trip</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-medium mb-2">Enter Trip Code</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
                  id="code" 
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Join Trip
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 