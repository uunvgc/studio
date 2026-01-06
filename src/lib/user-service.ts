/**
 * @fileOverview A mock user data service.
 * This file simulates fetching and updating user data. In a real application,
 * this would be replaced with actual calls to a database like Firestore.
 */

import type { UserData, PlanTier } from './types';

// Mock database
const MOCK_USER_DATA: Record<string, UserData> = {
  "user_placeholder_id": {
    plan: 'free',
    messagesUsedToday: 0,
    lastMessageDate: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
  }
};

/**
 * Simulates fetching user data from a database.
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves with the user's data.
 */
export async function getUserData(userId: string): Promise<UserData> {
  console.log(`[Mock Service] Fetching data for user: ${userId}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 250));
  
  // Return a copy to prevent direct mutation of the mock database
  return Promise.resolve({ ...MOCK_USER_DATA[userId] });
}

/**
 * Simulates updating user data in a database.
 * @param userId - The ID of the user to update.
 * @param data - An object containing the fields to update.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateUserData(userId: string, data: Partial<UserData>): Promise<void> {
  console.log(`[Mock Service] Updating data for user: ${userId}`, data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 250));

  if (MOCK_USER_DATA[userId]) {
    MOCK_USER_DATA[userId] = { ...MOCK_USER_DATA[userId], ...data };
  }
  
  return Promise.resolve();
}
