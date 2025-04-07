import { Trip } from './models';

/**
 * Request types
 */

export interface CreateTripRequest {
  name: string;
  goal_amount: number;
  max_participants: number;
  details: string;
  deadline: string; // ISO format date string
}

export interface JoinTripRequest {
  code: string;
}

export interface CommitmentRequest {
  name: string;
  amount: number;
}

/**
 * Response types
 */

export interface TripResponse {
  trip: Trip;
  total_committed: number;
  num_participants: number;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
} 