import { Trip, Commitment, Expense } from './models';

/**
 * Type guard to check if an object is a Trip
 */
export function isTrip(obj: unknown): obj is Trip {
  const record = obj as Record<string, unknown>;
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof record.name === 'string' &&
    typeof record.code === 'string' &&
    typeof record.goal_amount === 'number' &&
    typeof record.max_participants === 'number' &&
    typeof record.details === 'string' &&
    record.deadline instanceof Date &&
    record.created_at instanceof Date
  );
}

/**
 * Type guard to check if an object is a Commitment
 */
export function isCommitment(obj: unknown): obj is Commitment {
  const record = obj as Record<string, unknown>;
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof record.trip_id === 'number' &&
    typeof record.name === 'string' &&
    typeof record.amount === 'number'
  );
}

/**
 * Type guard to check if an object is an Expense
 */
export function isExpense(obj: unknown): obj is Expense {
  const record = obj as Record<string, unknown>;
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof record.trip_id === 'number' &&
    typeof record.title === 'string' &&
    typeof record.amount === 'number' &&
    typeof record.paid_by === 'string'
  );
}

/**
 * Creates dummy expenses for testing/mockups
 */
export function createDummyExpenses(tripId: number = 1): Expense[] {
  const categories = ['Accommodation', 'Food', 'Transportation', 'Activities', 'Other'];
  const names = ['Sophia', 'Grace'];
  
  return [
    {
      id: 1,
      trip_id: tripId,
      title: 'Hotel Booking',
      amount: 1200,
      paid_by: names[0],
      paid_on: new Date(new Date().setDate(new Date().getDate() - 5)),
      category: categories[0],
      notes: 'Booking for 2 nights at Ocean View Resort',
      created_at: new Date(new Date().setDate(new Date().getDate() - 5))
    },
    {
      id: 2,
      trip_id: tripId,
      title: 'Restaurant Dinner',
      amount: 180,
      paid_by: names[1],
      paid_on: new Date(new Date().setDate(new Date().getDate() - 3)),
      category: categories[1],
      notes: 'Dinner at Seaside Grill',
      created_at: new Date(new Date().setDate(new Date().getDate() - 3))
    },
    {
      id: 3,
      trip_id: tripId,
      title: 'Taxi to Airport',
      amount: 45,
      paid_by: names[0],
      paid_on: new Date(new Date().setDate(new Date().getDate() - 1)),
      category: categories[2],
      notes: 'Airport pickup and drop-off',
      created_at: new Date(new Date().setDate(new Date().getDate() - 1))
    }
  ];
}

/**
 * Creates a dummy trip for testing/mockups
 */
export function createDummyTrip(override: Partial<Trip> = {}): Trip {
  return {
    id: 1,
    name: 'Summer Beach Trip',
    code: 'abc123',
    goal_amount: 5000,
    max_participants: 4,
    details: 'Join us for a weekend in Ibiza! We\'ll be staying at a beachfront house with amazing views.\n\nWe\'ll need to pool our money for accommodations, food, and raves.',
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    created_at: new Date(),
    creator_id: 'user123',
    commitments: [
      { id: 1, trip_id: 1, user_id: 'sodofi', name: 'Sophia', amount: 1250, created_at: new Date() },
      { id: 2, trip_id: 1, user_id: 'gracewas_her', name: 'Grace', amount: 1250, created_at: new Date() },
    ],
    ...override
  };
}

/**
 * Format currency as USD
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

/**
 * Calculate total committed amount for a trip
 */
export function calculateTotalCommitted(commitments: Commitment[]): number {
  return commitments.reduce((sum, commitment) => sum + commitment.amount, 0);
}

/**
 * Calculate total expenses amount for a trip
 */
export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
} 