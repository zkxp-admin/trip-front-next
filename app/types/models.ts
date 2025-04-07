/**
 * TypeScript interfaces for the models from the original Flask application
 */

/**
 * Represents a group trip with fundraising goals and participant limits
 */
export interface Trip {
  id: number;
  name: string;
  code: string;
  goal_amount: number;
  max_participants: number;
  details: string;
  deadline: Date;
  created_at: Date;
  creator_id: string;
  commitments: Commitment[];
}

/**
 * Represents a financial commitment to a trip by a participant
 */
export interface Commitment {
  id: number;
  trip_id: number;
  user_id: string;
  name: string;
  amount: number;
  created_at: Date;
}

/**
 * Represents an expense for a trip
 */
export interface Expense {
  id: number;
  trip_id: number;
  title: string;
  amount: number;
  paid_by: string;
  paid_on: Date;
  category: string;
  notes: string;
  created_at: Date;
} 