'use client';

import { useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Trip, 
  Expense, 
  createDummyTrip, 
  createDummyExpenses, 
  formatCurrency, 
  calculateTotalExpenses 
} from '../../../types';

export default function ExpensesPage() {
  const { code } = useParams();
  const [trip] = useState<Trip>(createDummyTrip({ code: code as string }));
  const [expenses, setExpenses] = useState<Expense[]>(createDummyExpenses(trip.id));
  const [isAdding, setIsAdding] = useState(false);
  
  // Use a different interface for the form data to handle string inputs
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    paid_by: '',
    paid_on: new Date().toISOString().split('T')[0],
    category: 'Other',
    notes: ''
  });
  
  const categories = ['Accommodation', 'Food', 'Transportation', 'Activities', 'Other'];
  const totalExpenses = calculateTotalExpenses(expenses);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.amount || !formData.paid_by || !formData.paid_on) {
      return;
    }
    
    // Create new expense
    const newExpense: Expense = {
      id: expenses.length + 1,
      trip_id: trip.id,
      title: formData.title,
      amount: parseFloat(formData.amount),
      paid_by: formData.paid_by,
      paid_on: new Date(formData.paid_on),
      category: formData.category,
      notes: formData.notes,
      created_at: new Date()
    };
    
    // Add to expenses list
    setExpenses([...expenses, newExpense]);
    
    // Reset form
    setFormData({
      title: '',
      amount: '',
      paid_by: '',
      paid_on: new Date().toISOString().split('T')[0],
      category: 'Other',
      notes: ''
    });
    
    // Exit add mode
    setIsAdding(false);
  };
  
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{trip.name}: Expenses</h2>
          <Link 
            href={`/trip/${code}`} 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back to Trip Details
          </Link>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {isAdding ? 'Cancel' : '+ Add Expense'}
        </button>
      </div>
      
      {isAdding && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">Amount ($)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="paid_by" className="block text-sm font-medium mb-2">Paid By</label>
                <input
                  type="text"
                  id="paid_by"
                  name="paid_by"
                  value={formData.paid_by}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="paid_on" className="block text-sm font-medium mb-2">Date Paid</label>
                <input
                  type="date"
                  id="paid_on"
                  name="paid_on"
                  value={formData.paid_on}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Save Expense
            </button>
          </form>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Expense List</h3>
          <div className="text-lg font-medium">
            Total: <span className="text-blue-600 dark:text-blue-400">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
        
        {expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Paid By</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">{expense.title}</div>
                      {expense.notes && <div className="text-xs text-gray-500 dark:text-gray-400">{expense.notes}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{formatCurrency(expense.amount)}</td>
                    <td className="px-4 py-3 text-sm">{expense.paid_by}</td>
                    <td className="px-4 py-3 text-sm">{expense.paid_on.toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No expenses added yet. Add your first expense to track spending.
          </div>
        )}
      </div>
    </div>
  );
} 