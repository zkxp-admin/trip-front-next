'use client';

import { useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { Trip, Commitment, createDummyTrip, formatCurrency, calculateTotalCommitted } from '../../types';
import Link from 'next/link';

export default function TripDetail() {
  const { code } = useParams();
  const [trip, setTrip] = useState<Trip>(createDummyTrip({ code: code as string }));
  const [commitments, setCommitments] = useState<Commitment[]>(trip.commitments);
  const [formData, setFormData] = useState({
    name: '',
    amount: ''
  });
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [tripEditData, setTripEditData] = useState({
    name: trip.name,
    details: trip.details,
    goal_amount: String(trip.goal_amount),
    max_participants: String(trip.max_participants),
    deadline: trip.deadline.toISOString().split('T')[0]
  });
  
  // Calculate totals
  const totalCommitted = calculateTotalCommitted(commitments);
  const numParticipants = commitments.length;
  const progressPercentage = Math.round((totalCommitted / trip.goal_amount) * 100);
  const participantsPercentage = Math.round((numParticipants / trip.max_participants) * 100);
  const daysRemaining = Math.floor((trip.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };
  
  const handleTripEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTripEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount) return;
    
    // Check if this name already exists
    const existingIndex = commitments.findIndex(c => c.name === formData.name);
    
    if (existingIndex >= 0) {
      // Update existing commitment
      const newCommitments = [...commitments];
      newCommitments[existingIndex] = {
        ...newCommitments[existingIndex],
        amount: parseFloat(formData.amount as string)
      };
      setCommitments(newCommitments);
    } else {
      // Add new commitment
      if (numParticipants < trip.max_participants) {
        const newCommitment: Commitment = {
          id: commitments.length + 1,
          trip_id: trip.id,
          user_id: `user_${Date.now()}`, // generate a placeholder user ID
          name: formData.name,
          amount: parseFloat(formData.amount as string),
          created_at: new Date()
        };
        
        setCommitments([...commitments, newCommitment]);
      }
    }
    
    // Reset form
    setFormData({ name: '', amount: '' });
  };

  const handleTripEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Update the trip with new details
    setTrip({
      ...trip,
      name: tripEditData.name,
      details: tripEditData.details,
      goal_amount: parseFloat(tripEditData.goal_amount),
      max_participants: parseInt(tripEditData.max_participants),
      deadline: new Date(tripEditData.deadline)
    });
    
    // Exit edit mode
    setIsEditingTrip(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{trip.name}</h2>
            <button 
              onClick={() => setIsEditingTrip(!isEditingTrip)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              {isEditingTrip ? 'Cancel Edit' : 'Edit Trip'}
            </button>
          </div>
          
          {isEditingTrip ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <h5 className="font-semibold mb-4">Edit Trip Details</h5>
              <form onSubmit={handleTripEditSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Trip Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={tripEditData.name}
                      onChange={handleTripEditChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium mb-2">Deadline</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={tripEditData.deadline}
                      onChange={handleTripEditChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="goal_amount" className="block text-sm font-medium mb-2">Goal Amount ($)</label>
                    <input
                      type="number"
                      id="goal_amount"
                      name="goal_amount"
                      value={tripEditData.goal_amount}
                      onChange={handleTripEditChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="max_participants" className="block text-sm font-medium mb-2">Max Participants</label>
                    <input
                      type="number"
                      id="max_participants"
                      name="max_participants"
                      value={tripEditData.max_participants}
                      onChange={handleTripEditChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="details" className="block text-sm font-medium mb-2">Trip Details</label>
                  <textarea
                    id="details"
                    name="details"
                    value={tripEditData.details}
                    onChange={handleTripEditChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Save Changes
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">Progress</h5>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-1">
                      <div 
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        {formatCurrency(totalCommitted)} / {formatCurrency(trip.goal_amount)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Participants</h5>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-1">
                      <div 
                        className="bg-green-600 h-6 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ width: `${participantsPercentage}%` }}
                      >
                        {numParticipants} / {trip.max_participants} people
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                <h5 className="font-semibold mb-3">Trip Details</h5>
                <p className="trip-details">{trip.details}</p>
              </div>
            </>
          )}

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h5 className="font-semibold mb-3">Contributors</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {commitments.map((commitment, index) => (
                    <tr key={commitment.id || index} className="border-t dark:border-gray-700">
                      <td className="py-3 px-4">{commitment.name}</td>
                      <td className="py-3 px-4">{formatCurrency(commitment.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h5 className="font-semibold mb-3">Important Information</h5>
            <ul className="space-y-2">
              <li><strong>Trip Code:</strong> {code}</li>
              <li><strong>Deadline:</strong> {trip.deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
              <li><strong>Days Remaining:</strong> {daysRemaining} days</li>
            </ul>
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <Link 
                href={`/trip/${code}/expenses`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                View Expenses
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h5 className="font-semibold mb-4">Add or Update Contribution</h5>
            {numParticipants < trip.max_participants ? (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name to add or update contribution"
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium mb-2">Contribution Amount ($)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" 
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      min="1"
                      step="0.01"
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Submit Contribution
                  </button>
                </form>
                <div className="mt-3">
                  <small className="text-gray-500 dark:text-gray-400">
                    * To update your contribution, enter your name exactly as it appears in the list
                  </small>
                </div>
              </>
            ) : (
              <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-4">
                This trip is already full.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 